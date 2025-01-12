import { ConflictException, Logger, HttpStatus } from '@nestjs/common'
import { type ObjectLiteral, type QueryRunner, Repository, type DataSource } from 'typeorm'

export abstract class GenericRepository<T extends ObjectLiteral> extends Repository<T> {
  private readonly loggerGen = new Logger(GenericRepository.name)

  protected async createRelationships(queryRunner: QueryRunner, tableName: string, secondColumnIdName: string, mainObjectNameColumnId: string, mainObjectColumnIdValue: string, newIds: string[]) {
    if (!newIds || newIds.length === 0) {
      this.loggerGen.warn('Nenhum ID novo foi passado para createRelationships.')
      return
    }

    const existingIds = await queryRunner.manager
      .createQueryBuilder()
      .select(secondColumnIdName)
      .from(tableName, tableName)
      .where(`${mainObjectNameColumnId} = :mainObjectColumnIdValue`, { mainObjectColumnIdValue })
      .getRawMany()

    if (!existingIds || existingIds.length === 0) {
      this.loggerGen.warn(`Nenhum ID existente encontrado em ${tableName} para ${mainObjectColumnIdValue}.`)
    }

    const existingIdSet = new Set(existingIds.map((item) => item[secondColumnIdName]))

    for (const id of newIds) {
      if (!existingIdSet.has(id)) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(tableName)
          .values({ [mainObjectNameColumnId]: mainObjectColumnIdValue, [secondColumnIdName]: id })
          .execute()
      }
    }
  }

  protected async deleteRelationshipsAndSecondaryEntity(
    queryRunner: QueryRunner,
    nameTableRelationship: string, // Nome da tabela de relacionamento
    mainObjectNameColumnId: string, // Nome da coluna do objeto principal no relacionamento
    mainObjectId: string, // ID do objeto principal
    nameEntitySecond: any, // Nome da entidade secundária (classe da entidade)
    secondTableIds: string[], // IDs das entidades secundárias
  ) {
    try {
      if (secondTableIds.length > 0) {
        // Deleta os relacionamentos na tabela de relacionamento
        await queryRunner.manager.createQueryBuilder().delete().from(nameTableRelationship).where(`${mainObjectNameColumnId} = :mainObjectId`, { mainObjectId }).execute()

        // Deleta as entidades secundárias
        await queryRunner.manager.createQueryBuilder().delete().from(nameEntitySecond).where('id IN (:...ids)', { ids: secondTableIds }).execute()
      }
    } catch (error) {
      this.loggerGen.error('Erro ao excluir relacionamentos e entidades secundárias:', error)
      throw error
    }
  }

  // DESATIVA OU DELETA
  protected async updateRelationships(
    queryRunner: QueryRunner,
    tableName: string,
    secondaryTableColumnIdName: string,
    mainObjectNameColumnId: string,
    mainObjectColumnIdValue: string,
    newIds?: string[] | null,
    deleteRelationship = false,
    deleteSecondObject = false,
    disableSecondObject = false,
  ): Promise<void> {
    try {
      const newIdSet = new Set(newIds || [])
      const currentIds = await queryRunner.manager
        .createQueryBuilder()
        .select(secondaryTableColumnIdName)
        .from(tableName, tableName)
        .where(`${mainObjectNameColumnId} = :mainObjectColumnIdValue`, { mainObjectColumnIdValue })
        .getRawMany()

      const currentIdSet = new Set(currentIds.map((item) => item[secondaryTableColumnIdName]))
      const idsToRemove = Array.from(currentIdSet).filter((id) => !newIdSet.has(id))
      const idsToAdd = Array.from(newIdSet).filter((id) => !currentIdSet.has(id))

      // Remover relacionamentos antes de excluir registros
      if (idsToRemove.length > 0 && deleteRelationship) {
        this.loggerGen.log('Removing relationships')
        await queryRunner.manager
          .createQueryBuilder()
          .delete()
          .from(tableName)
          .where(`${secondaryTableColumnIdName} IN (:...ids)`, { ids: idsToRemove })
          .andWhere(`${mainObjectNameColumnId} = :mainObjectColumnIdValue`, { mainObjectColumnIdValue })
          .execute()
      }

      // Excluir registros na tabela secundária
      if (idsToRemove.length > 0 && deleteSecondObject) {
        this.loggerGen.log('Deleting second object')
        await queryRunner.manager.createQueryBuilder().delete().from(this.deriveSecondaryTableName(secondaryTableColumnIdName)).where('id IN (:...ids)', { ids: idsToRemove }).execute()
      }

      // Desativar registros secundários
      if (idsToRemove.length > 0 && disableSecondObject) {
        await queryRunner.manager.createQueryBuilder().update(this.deriveSecondaryTableName(secondaryTableColumnIdName)).set({ isActive: false }).where('id IN (:...ids)', { ids: idsToRemove }).execute()
      }

      // Adicionar novos relacionamentos
      if (idsToAdd.length > 0) {
        await this.handleActivation(queryRunner, tableName, this.deriveSecondaryTableName(secondaryTableColumnIdName), secondaryTableColumnIdName, mainObjectNameColumnId, mainObjectColumnIdValue, idsToAdd)
      }
    } catch (error) {
      this.loggerGen.error(`Error in updateRelationships for table ${tableName}`, { error, tableName, mainObjectColumnIdValue })
      throw error
    }
  }

  private deriveSecondaryTableName(columnIdName: string): string {
    let tableName = columnIdName.replace('id_', '')

    if (!tableName.endsWith('s') && !tableName.endsWith('council') && !tableName.endsWith('y')) {
      tableName += 's'
      if (tableName === 'images') {
        tableName = 'medias'
      }
    } else if (tableName.endsWith('y')) {
      tableName = tableName.slice(0, -1) + 'ies'
    }

    return tableName
  }

  private async handleActivation(
    queryRunner: QueryRunner,
    tableName: string,
    secondaryTableName: string,
    secondaryTableColumnIdName: string,
    mainObjectNameColumnId: string,
    mainObjectColumnIdValue: string,
    idsToActivate: unknown[],
  ) {
    const promises = idsToActivate.map(async (id) => {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(tableName)
        .values({ [mainObjectNameColumnId]: mainObjectColumnIdValue, [secondaryTableColumnIdName]: id })
        .execute()

      await queryRunner.manager.createQueryBuilder().update(secondaryTableName).set({ isActive: true }).where('id = :id', { id }).execute()
    })

    await Promise.all(promises)
  }

  protected async verifyDuplicityCreate<T>(dataSource: DataSource, entity: new () => T, findBy: keyof T, item: T[keyof T], isActive?: boolean): Promise<void> {
    try {
      const criteria = { [String(findBy)]: item }
      const exist = await dataSource.manager.findOneBy(entity, criteria)

      if (exist) {
        if (isActive !== undefined && exist.isActive === false) {
          await dataSource.manager.update(entity, exist.id, { isActive: true })
        }
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: `${String(findBy)} already exists!`,
          data: exist,
        })
      }
    } catch (e) {
      // this.loggerGen.log(JSON.stringify(e, null, 2))
      this.loggerGen.log('verifyDuplicityCreate ', e)
      throw e
    }
  }

  protected async verifyDuplicityUpdate<T>(queryRunner: QueryRunner, entity: new () => T, findBy: keyof T, item: T[keyof T], data: { criteria: { id: string } }): Promise<void> {
    try {
      const criteria = { [String(findBy)]: item }
      const exist = await queryRunner.manager.findOneBy(entity, criteria)

      if (exist && data.criteria.id !== exist.id) {
        throw new ConflictException(`${String(findBy)} already exists!`)
      }
    } catch (e) {
      this.loggerGen.log('verifyDuplicityUpdate ', e)
      throw e
    }
  }
}

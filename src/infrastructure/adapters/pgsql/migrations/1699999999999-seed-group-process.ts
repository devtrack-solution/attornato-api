import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedGroupProcess1699999999999 implements MigrationInterface {
  name = 'SeedGroupProcess1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const groupProcessNames = [
      'Administrativo',
      'aposentadoria',
      'APOSENTADORIA ESPECIAL',
      'AP. POR TEMPO DE CONTRIBUIÇAO',
      'BOLSA FAMILIA',
      'BPC DEFICIENTE',
      'CIVEL',
      'Cível',
      'Cível Federal',
      'Criminal',
      'dpvat',
      'FILIAL 2',
      'JUDICIAL',
      'Juizado Criminal',
      'NOME DO CLIENTE ERRADO',
      'PARAPREV SANTA IZABEL',
      'PRE',
      'PREFEITURA - DIGISAC',
      'PREV',
      'PREVIDENCIÁRIO',
      'PREVIDENCIÁRIO - DIGISAC',
      'PREVIDENCIÁRIO ML',
      'PREVIDENCIÁRIO PARAPREVI',
      'PROCESSO OAB',
      'SAL.MATERNIDADE',
      'Trabalhista',
      'TRABALHISTA - DIGITAL',
      'TRABALHISTA - SANTA IZABEL',
      'TRIBUTÁRIO',
    ]

    for (const name of groupProcessNames) {
      await queryRunner.query(`INSERT INTO "group_process" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "group_process"`)
  }
}

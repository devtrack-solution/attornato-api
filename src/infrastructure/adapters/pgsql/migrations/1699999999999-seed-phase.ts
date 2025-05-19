import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedPhase1699999999999 implements MigrationInterface {
  name = 'SeedPhase1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = [
      'AGUARDANDO ANÁLISE',
      'Aguardando arquivamento',
      'aguardando correção',
      'aguardando distribuição',
      'AGUARDANDO SANEAMENTO',
      'AGUARDANDO SENTENÇA',
      'ajuizada',
      'arquivado - ausência',
      'arquivado - desistência',
      'arquivado - execução finda',
      'Arquivado - inépcia',
      'arquivado - trânsito em julgado',
      'celebrado acordo',
      'COLHER DEPOIMENTO DAS PARTES',
      'conhecimento',
      'Defesa Prévia',
      'diligência',
      'execução',
      'extinto sem julgamento do mérito',
      'instrução',
      'JULGAMENTO',
      'PAGAMENTO DE ACORDO',
      'Pericia',
      'Recursal',
      'requerimento administrativo',
      'SENTENCIADO',
    ]

    for (const name of names) {
      await queryRunner.query(`INSERT INTO "phases" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "phases"`)
  }
}

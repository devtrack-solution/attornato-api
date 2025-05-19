import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedSubject1699999999999 implements MigrationInterface {
  name = 'SeedSubject1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = [
      'AÇÃO DE EMISSÃO DE PAGAMENTO NÃO RECEBIDO',
      'Acidente de Trabalho',
      'Anotação / Baixa / Retificação',
      'APOSENTADORIA',
      'APOSENTADORIA RURAL',
      'AUXILIO DOENÇA',
      'BPC Deficiente',
      'CESSÃO DE CRÉDITO',
      'CONCESSÃO',
      'Cumprimento provisório de sentença',
      'DANO MATERIAL',
      'DANO MORAL',
      'Danos Indígenas',
      'DANOS MORAIS PELA RASURA NA CTPS',
      'DEFESA MOB',
      'DEFICIENTE',
      'Embargos de Terceiros',
      'HORAS IN ITINERES',
      'IDOSO',
      'Injuria Calunia Difamação',
      'INVENTÁRIO',
      'PAB',
      'PENSÃO',
      'PREMIO PRODUÇÃO',
      'Processo Administrativo MPT',
      'RESTABELECIMENTO',
      'revisão',
      'RURAL',
      'URBANA',
      'verbas e dano moral',
      'VIDA TODA',
      'VT',
    ]

    for (const name of names) {
      await queryRunner.query(`INSERT INTO "subjects" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "subjects"`)
  }
}

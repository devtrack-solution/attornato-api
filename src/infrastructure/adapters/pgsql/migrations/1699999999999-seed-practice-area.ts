import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedPracticeArea1699999999999 implements MigrationInterface {
  name = 'SeedPracticeArea1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = [
      'Direito Acidentário',
      'Direito Administrativo',
      'Direito Agrário',
      'Direito Ambiental',
      'Direito Animal',
      'Direito Bancário',
      'Direito Cível',
      'Direito Comercial',
      'Direito Condominial',
      'Direito Constitucional',
      'Direito da Infância e da Juventude',
      'Direito da Saúde',
      'Direito das Sucessões',
      'Direito de Energia',
      'Direito de Trânsito',
      'Direito Digital',
      'Direito do Consumidor',
      'Direito do Estado',
      'Direito do Trabalho',
      'Direito Econômico',
      'Direito Eleitoral',
      'Direito Empresarial',
      'Direito Família',
      'Direito Imobiliário',
      'Direito Internacional',
      'Direito Médico',
      'Direito Militar',
      'Direito Minerário',
      'Direito Penal',
      'Direito Previdenciário',
      'Direito Securitário',
      'Direito Tributário',
      'Execução Fiscal',
    ]

    for (const name of names) {
      await queryRunner.query(`INSERT INTO "practice_areas" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "practice_areas"`)
  }
}

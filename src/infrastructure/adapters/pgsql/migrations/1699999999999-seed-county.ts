import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedCounty1699999999999 implements MigrationInterface {
  name = 'SeedCounty1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const countyNames = [
      'Abaetetuba',
      'Acará',
      'Ananindeua',
      'Aurora do Pará',
      'Barcarena',
      'Belém',
      'BENEVIDES',
      'Bujarú',
      'CACHOEIRA DO ARARI',
      'Capanema',
      'Castanhal',
      'COLARES',
      'CONCORDIA',
      'CURRALINHO',
      'Dom Eliseu',
      'Icoaraci',
      'Ipixuna do Pará',
      'IRITUIA',
      'Juizado especial de Icoaraci',
      'MÃE DO RIO',
      'Marituba',
      'MAUÁ',
      'PARÁ',
      'Paragominas',
      'PARAUPEBAS',
      'Santa Izabel do Pará',
      'Santo Antônio do Tauá',
      'SÃO DOMINGOS DO CAPIM',
      'São Miguel do Guamá',
      'Tailândia',
      'Tomé Açu',
      'Tucurui',
      'Vigia',
    ]

    for (const name of countyNames) {
      await queryRunner.query(`INSERT INTO "counties" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "counties"`)
  }
}

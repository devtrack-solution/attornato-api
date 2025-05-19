import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedProfile1699999999999 implements MigrationInterface {
  name = 'SeedProfile1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const profileNames = [
      'ACARÁ',
      'Administrativo-Belém',
      'BOLSA FAMILIA',
      'Cível',
      'Civel - Belém',
      'CIVEL - DIGISAC',
      'Cível - Paraprev',
      'CÍVEL - SANTA IZABEL',
      'CIVEL - SIP',
      'CIVIL -SIP',
      'CLIENTE PREV',
      'Criminal',
      'CURUÇAMBÁ',
      'DIVERSOS',
      'DPVAT',
      'DPVAT-BELÉM',
      'FILIAL 2',
      'OREVIDENCIARIO-DRA. CHRISTIANE',
      'PARAPREV CASTANHEIRA',
      'paraprevi',
      'PARAPREV SANTA IZABEL',
      'PRE',
      'PREVIDENCIARIO',
      'Previdenciário',
      'PREVIDENCIÁRIO - BELÉM',
      'PREVIDENCIARIO - DIGISAC',
      'PREVIDENCIARIO-DRA. CHRISTIANE',
      'PREVIDENCIARIO-MARAJO',
      'PREVIDENCIÁRIO PARAPREVI',
      'PREVIDENCIÁRIO - SANTA IZABEL',
      'Tailândia',
      'Trabalhista',
      'TRABALHISTA-2ªVT ABAETETUBA',
      'TRABALHISTA-ANANIDEUA',
      'TRABALHISTA - BELÉM',
      'TRABALHISTA-CASTANHAL',
      'TRABALHISTA - DIGISAC',
      'TRABALHISTA - DIGITAL',
      'TRABALHISTA PARAGOMINAS',
      'TRABALHISTA - SANTA IZABEL',
      'Tributário',
    ]

    for (const name of profileNames) {
      await queryRunner.query(`INSERT INTO "profiles" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "profiles"`)
  }
}

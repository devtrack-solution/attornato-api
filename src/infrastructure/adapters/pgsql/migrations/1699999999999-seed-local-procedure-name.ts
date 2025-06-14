import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedLocalProcedureName1699999999999 implements MigrationInterface {
  name = 'SeedLocalProcedureName1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = [
      '10ª Vara do Juizado Especial C',
      '10ª Vara Federal de Juizado Especial Cível da SJPA',
      '11ª Vara Cível e Empresarial d',
      '11ª Vara Cível e Empresarial de Belém',
      '11ª Vara Cível e Empresarial de Santa Izabel',
      '11ª Vara do Juizado Especial Cível',
      '11ª Vara Federal Cível da SJPA',
      '11ª Vara Federal de Juizado Especial Cível da SJPA',
      '12ª Vara Cível e Empresarial',
      '12ª Vara do Juizado Especial Cível',
      '12ª VARA DO TRABALHO DE BELÉM',
      '12ª Vara Federal de Juizado Especial Cível da SJPA',
      '13ª Vara Cível e Empresarial d',
      '1ª Turma de Direito Público',
      '1ª Vara Cível e Criminal de Ta',
      '1ª Vara Cível e Empresarial de',
      '1ª Vara Cível e Empresarial de Belém',
      '1ª Vara Cível e Empresarial de Benevides',
      '1ª Vara Cível e Empresarial de Santa Izabel',
      '1ª Vara Cível e Empresarial Di',
      '1ª Vara Criminal Distrital de',
      '1ª Vara da Família de Ananinde',
      '1ª Vara de Fazenda da Capital',
      '1ª Vara do Juizado Especial Cível de Belém',
      '1ª VARA DO TRABALHO DE ANANINDEUA',
      '1ª Vara Federal Cível da SJPA',
      '1ª Vara Federal da SSJ de Sant',
      '1º Juizado Especial da Fazenda',
      '1º VT ABAETETUBA',
      '1º VT ANANINDEUA',
      '2ª Relatoria da 1ª Turma Recursal da SJAP e da SJP',
      '2ª Relatoria da 2ª Turma Recu',
      '2ª Turma de Direito Público',
      '2ª Turma Recursal da SJAP e da',
      '2ª Turma Recursal Permanente d',
      '2ª Vara Cível e Empresarial de',
      '2ª Vara Cível e Empresarial de Ananindeua',
      '2ª Vara Cível e Empresarial de Benevides',
      '2ª Vara Cível e Empresarial de Santa Izabel',
      '2ª Vara da Fazenda de Belém',
      '2ª Vara do Juizado Especial Cível de Belém',
      '2ª Vara Federal Cível da SJPA',
      '2º Turma de Direito Privado',
      '2º VARA UNICA ICOARACI',
      '2º VT ABAETETUBA',
      '2º VT ANANINDEUA',
      '2º VT MARABA',
      '3ª Relatoria da 1ª Turma Recursal da SJAP e da SJP',
      '3ª Vara Cível e Empresarial de',
      '3ª Vara Cível e Empresarial de Belém',
      '3ª Vara de Execução Fiscal de Belém',
      '3ª Vara de Fazenda da Capital',
      '3ª Vara do Juizado Especial Cí',
      '3º VT ANANINIDEUA',
      '4ª Vara Cível e Empresarial de Belém',
      '4ª Vara da Fazenda de Belém',
      '4ª Vara do Juizado Especial Cível de Belém',
      '4º VT ANANINDEUA',
      '5ª Vara Cível e Empresarial de',
      '5ª Vara do Juizado Especial Cível de Belém',
      '5ª Vara Federal Cível da SJPA',
      '6ª Vara do Juizado Especial Cí',
      '7ª Vara Cível e Empresarial de',
      '7ª Vara do Juizado Especial Cí',
      '7ª Vara Federal de Execução Fi',
      '8ª Vara do Juizado Especial Cível de Belém',
      '8ª Vara Federal de Juizado Especial Cível da SJPA',
      '9ª Vara do Juizado Especial Cível de Belém',
      'ABAETETUBA',
      'ª Turma Recursal da SJAP e da',
      'Camara Civel Isolada',
      'CEJUSC',
      'CEJUSC ITINERANTE SANTA IZABEL',
      'CEJUSC ITINERANTE SIP',
      'CEJUSC-JT 1º grau - Belém',
      'Cível',
      'Corregedoria Regional de Justiça do Trabalho',
      'FORO DE MAUÁ',
      'FORUM DE TAILANDIA',
      'HELEN',
      'INSS',
      'INSS - ANANINDEUA',
      'INSS - BRAGANÇA',
      'INSS CAPANEMA',
      'INSS - CASTANHAL',
      'INSS - CIDADE NOVA',
      'INSS - ICOARACI',
      'INSS - MARCO',
      'INSS - MOSQUEIRO',
      'INSS - NAZARE',
      'INSS - PARAGOMINAS',
      'INSS - PEDREIRA',
      'INSS - SÃO BRAZ',
      'INSS - SIP',
      'JEC Idoso',
      'JUIZADO CRIMINAL',
      'Juizado Especial Cível',
      'Juizado Especial Cível  de São Miguel do',
      'Juizado Especial Cível e Crimi',
      'Juizado Especial Cível e Criminal Adjunto à Vara F',
      'JUIZADO ESPECIAL CÍVEL E CRIMINAL DE SANTA IZABEL',
      'Juizado Especial de Icoaraci',
      'Juizado Especial Federal',
      'Jurisdição: Tribunal Regional',
      'MINISTERIO PUBLICO DO PARA',
      'POLÍCIA FEDERAL',
      'PREVIDENCIARIO-SANTA IZABEL/PA',
      'TJPA',
      'TRT8',
      'uizado Especial Cível e Criminal Adjunto à Vara Fe',
      'Va Cível',
      'VARA',
      'Vara Cível e empresarial',
      'Vara Cível e Empresarial Distrital de Icoaraci',
      'Vara Criminal Distrital de Icoaraci',
      'Vara da Família Distrital de I',
      'VARA DA FAZENDA',
      'Vara da Fazenda Pública de Ana',
      'Vara de Execução Fiscal',
      'Vara de Familia de Icoaraci',
      'Vara do Juizado Especial Cível',
      'Vara do Juizado Especial Cível de Acidentes de Trâ',
      'Vara do Trabalho',
      'VARA DO TRABALHO DE CASTANHAL',
      'Vara do Trabalho de Santa Izabel do Pará',
      'VARA FEDERAL',
      'VARA FEDERAL CÍVEL DA SJPA',
      'VARAS CÍVEIS',
      'Varas Cíveis - Fazenda Pública',
      'Vara Unica',
      'Vara Única',
      'Vara Unica Bonito',
      'vara unica de',
      'Vara Única de Acará',
      'VARA ÚNICA DE ANANINDEUA',
      'Vara Única de Aurora do Pará',
      'Vara Única de Bonito',
      'Vara Única de Bujarú',
      'VARA ÚNICA DE CASTANHAL',
      'Vara Única de Concórdia do Pará',
      'VARA UNICA DE ICOARACI',
      'Vara Única de Igarapé-Açú',
      'Vara Única de Ipixuna do Pará',
      'Vara Única de Irituia',
      'Vara Única de Mãe do Rio',
      'Vara Única de Paragominas',
      'Vara Única de Portel',
      'Vara Única de Primavera',
      'VARA ÚNICA DE SANTARÉM',
      'Vara Única de Santo Antônio do Tauá',
      'Vara Única de São Domingos do Capim',
      'Vara Única de São Miguel do Guamá',
      'Vara Única de Tomé Açu',
      'VARA ÚNICA DE TUCURUI',
      'Vara Única de Viseu',
      'VARA UNICA SALINOPOLIS',
      'VARA ÚNICA SANTA ISABEL DO PARA',
      'VARA ÚNICA SANTA IZABEL DO PAR',
      'VARA UNICA TUCURUI',
      'VT ALTAMIRA',
      'VT ANANINDEUA',
      'VT BELÉM',
      'VT CAPANEMA',
      'VT CASTANHAL',
      'VT MARABA',
      'VT PARAGOMINAS',
      'VT REDENÇÃO',
      'VT  SÃO FÉLIX DO XINGU',
      'VT SÃO FELIZ DO XINGU',
      'VT SIP',
      'VT TUCURUI',
    ]

    for (const name of names) {
      await queryRunner.query(`INSERT INTO "local_procedure_names" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "local_procedure_names"`)
  }
}

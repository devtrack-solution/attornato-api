import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedLocator1699999999999 implements MigrationInterface {
  name = 'SeedLocator1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = [
      'acordo',
      'ACORDO (QUITADO)',
      'AGUARDANDO ANALISE',
      'Aguardando Arquivamento',
      'AGUARDANDO LIBERACAO DE DATA',
      'AGUARDANDO PERICIA',
      'Aguardando RT',
      'aguardando saneamento',
      'AGUARDANDO SENTENCA',
      'ajuizada',
      'ANALISAR PASTA',
      'ANALISE',
      'andamento',
      'ARQUIVADO',
      'ARQUIVADO/AUSENTE',
      'ARQUIVADO DEFINITIVO',
      'ARQUIVADO E QUITADO',
      'ARQUIVADO/ TOTALMENTE IMPROCEDENTES',
      'Aud. Execução',
      'audiência',
      'Audiência Cancelada',
      'Ausência',
      'Ausência do Reclamante - Arquivado',
      'AVALIAÇÃO SOCIAL',
      'BENEFICIO CONCEDIDO',
      'cancelada',
      'CANCELADO',
      'CONCEDIDO',
      'Da entrada administrativamente',
      'DEFERIDO',
      'DESISTÊNCIA',
      'DISTRIBUIDO',
      'Dr. Landin',
      'EM ANÁLISE',
      'EMBARGOS DECLARATÓRIOS',
      'ENCERRAMENTO',
      'ESPOLIO',
      'EXCLUIR',
      'execução',
      'FALTOU',
      'FALTOU DOCUMENTO',
      'FAZER REQUERIMENTO',
      'IMPROCEDENTE',
      'IMPROCEDENTE E ARQUIVADO',
      'INDEFERIDO',
      'judicial',
      'Julgado extinto sem resolução do mérito.',
      'OAB',
      'PARAPREVI',
      'PASTA DUPLICADA',
      'PENDENTE DE PROTOCOLO',
      'Perempção',
      'PERICIA',
      'PERICIA MEDICA',
      'Prazo',
      'PRESCRIÇÃO',
      'PROCESSO DUPLICADO',
      'protocolado',
      'QUITADO',
      'QUITADO E ARQUIVADO',
      'REAJUIZAMENTO',
      'reclamante PRESENTE',
      'RECURSO',
      'requerimento administrativo',
      'Sobrestado',
      'tramitaçao processual',
      'TRT',
      'TST',
    ]

    for (const name of names) {
      await queryRunner.query(
        `INSERT INTO "locators" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [uuidv4(), name],
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "locators"`)
  }
}

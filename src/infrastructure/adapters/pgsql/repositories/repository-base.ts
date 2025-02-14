import { ObjectLiteral, Repository } from "typeorm";
import { EntityTarget } from "typeorm/common/EntityTarget";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { QueryRunner } from "typeorm/query-runner/QueryRunner";


export abstract class RepositoryBase<T extends ObjectLiteral> extends Repository<T> {

  protected constructor(target: EntityTarget<T>, manager: EntityManager, queryRunner?: QueryRunner) {
    super(target, manager, queryRunner);
  }

}
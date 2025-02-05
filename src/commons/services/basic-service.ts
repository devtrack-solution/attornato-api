/**
 * Created by Wilton Oliveira Ferreira on 17/01/2023
 */

import { badRequest } from '@/commons/helpers'
import { BadRequestException } from '@nestjs/common'
import { ITransactionContext } from '@/core/transactions/transaction-context.interface'

export interface ServiceIntegrate<T, Y> {
  perform: (data: ITransactionContext<T | any>) => Promise<Y>
}

export interface Service<T, Y> {
  handle: (data: ITransactionContext<T | any>) => Promise<Y>
}
export abstract class BasicService<T, Y> implements Service<T, Y> {
  abstract perform(data: ITransactionContext<T | any>): Promise<Y>

  async handle(data: ITransactionContext<T | any>): Promise<Y> {
    try {
      if (data === undefined) {
        badRequest(new BadRequestException())
      }
      return await this.perform(data)
    } catch (error) {
      throw error
    }
  }
}

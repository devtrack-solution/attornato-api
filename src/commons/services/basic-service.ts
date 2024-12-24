/**
 * Created by Wilton Oliveira Ferreira on 17/01/2023
 */

import { badRequest } from '@/commons/helpers'
import { BadRequestException } from '@nestjs/common'

export interface Service<T, Y> {
  perform: (data: T) => Promise<Y>
  handle: (data: T | any) => Promise<Y>
}
export abstract class BasicService<T, Y> implements Service<T, Y> {
  abstract perform(data: T): Promise<Y>

  async handle(data: T | any): Promise<Y> {
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

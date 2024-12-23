/**
 * Created by Wilton Oliveira Ferreira on 17/01/2023
 */

import { type HttpRequest, type HttpResponse, type ResponseError, badRequest, conflict, notfound, serverError, unauthorized } from '@/shared/helpers'
import { ValidationComposite, type Validator } from '@/shared/validation'
import { BadRequestException, ConflictException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { type Request, type Response } from 'express'

export interface Controller<T, Y> {
  perform: (httpRequest: HttpRequest<T>) => Promise<HttpResponse<Y | ResponseError | any>>
}

export abstract class BasicController<T, Y> implements Controller<T, Y> {
  protected sub = ''
  protected basicLogger = new Logger(BasicController.name)

  abstract perform(httpRequest: HttpRequest<T>): Promise<HttpResponse<Y | ResponseError | any>>

  buildValidators(httpRequest: any): Validator[] {
    console.log(httpRequest)
    return []
  }

  async handle(request: Request, response: Response, body: T | any, param: any, query: any): Promise<HttpResponse<Y | ResponseError>> {
    try {
      const user = request.user as any
      this.sub = user?.userId ?? ''
      this.basicLogger.log(`Requested by account ${user?.userId ?? 'anonymous'}`)
      const error = this.validate({
        request,
        response,
        body,
        param,
        query,
      } as HttpRequest)
      if (error !== undefined) {
        throw error
      }
      switch (request.method) {
        case 'POST':
        case 'PUT':
          body = { ...body }
          break
        default:
          break
      }
      return await this.perform({ request, response, body, param, query })
    } catch (error: any) {
      this.basicLogger.error(error)
      if (error instanceof ConflictException) {
        return this.responseErrorRequest(response, conflict(error))
      } else if (error instanceof BadRequestException) {
        return this.responseErrorRequest(response, badRequest(error))
      } else if (error instanceof NotFoundException) {
        return this.responseErrorRequest(response, notfound(error))
      } else if (error instanceof UnauthorizedException) {
        return this.responseErrorRequest(response, unauthorized(error))
      } else {
        return this.responseErrorRequest(response, serverError(error))
      }
    }
  }

  protected async responseRequest(response: Response, data: HttpResponse<Y>): Promise<HttpResponse<Y>> {
    return response.status(data.statusCode).json(data.data)
  }

  protected async responseErrorRequest(response: Response, data: HttpResponse<ResponseError>): Promise<HttpResponse<ResponseError>> {
    return response.status(data.statusCode).json({
      statusCode: data.statusCode,
      message: data.data?.message ?? data.message,
      data: data.data?.data,
    })
  }

  private validate(httpRequest: HttpRequest<T>): any {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}

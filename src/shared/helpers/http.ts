import { ServerError } from '@/shared/errors';
import {
  type BadRequestException,
  type ConflictException,
  HttpStatus,
  type NotFoundException,
  type UnauthorizedException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { type Request, type Response } from 'express';

export class ResponseError {
  @ApiProperty()
  statusCode!: number;

  @ApiProperty()
  message!: string;

  @ApiProperty()
  data?: string;

  constructor(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export type HttpResponse<T = any | ResponseError> = {
  statusCode: HttpStatus;
  data?: T;
  message?: string;
};

export type HttpRequest<T = any, X = any, Y = any> = {
  request: Request;
  response: Response;
  body?: T;
  query?: X;
  param?: Y;
};

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: HttpStatus.OK,
  data,
});

export const accepted = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: HttpStatus.ACCEPTED,
  data,
});

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: HttpStatus.CREATED,
  data,
});

export const badRequest = (
  error: BadRequestException,
): HttpResponse<ResponseError> => ({
  statusCode: HttpStatus.BAD_REQUEST,
  message: error.message ?? 'Falha na requisição!',
});
export const conflict = (
  error: ConflictException,
): HttpResponse<ResponseError> => {
  const response = error.getResponse() as { message: string; data?: any };
  return {
    statusCode: HttpStatus.CONFLICT,
    data: new ResponseError(
      HttpStatus.CONFLICT,
      error.message ?? 'Conflito na requisição!',
      response.data ?? response,
    ),
  };
};

export const unauthorized = (
  error: UnauthorizedException,
): HttpResponse<ResponseError> => ({
  statusCode: HttpStatus.UNAUTHORIZED,
  message: error.message ?? 'Acesso não autorizado!',
});

export const notfound = (
  message: NotFoundException,
): HttpResponse<ResponseError> => ({
  statusCode: HttpStatus.NOT_FOUND,
  message: message.message ?? 'Recurso não encontrado!',
});

export const forbidden = (): HttpResponse<ResponseError> => ({
  statusCode: HttpStatus.FORBIDDEN,
  message: 'Operação não permitida!',
});

export const serverError = (error: unknown): HttpResponse<ResponseError> => ({
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  message: new ServerError(error instanceof Error ? error : 'Error inesperado')
    .message,
});

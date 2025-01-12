import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception.getStatus() === HttpStatus.TOO_MANY_REQUESTS
        ? HttpStatus.TOO_MANY_REQUESTS
        : exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message:
        status === HttpStatus.TOO_MANY_REQUESTS
          ? 'Você excedeu o limite de requisições. Tente novamente mais tarde.'
          : exception.message,
    });
  }
}
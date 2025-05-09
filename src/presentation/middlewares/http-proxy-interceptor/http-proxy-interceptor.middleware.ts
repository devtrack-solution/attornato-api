// import { Injectable, type NestMiddleware, UnauthorizedException } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
// import { JwtService } from '@nestjs/jwt'
// import { FastifyRequest as Request, FastifyReply as Response } from 'fastify'
//
// @Injectable()
// export class HttpProxyInterceptorMiddleware implements NestMiddleware {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly jwtService: JwtService,
//   ) {}
//
//   async use(req: Request, res: Response, next: () => void): Promise<any> {
//     const exceptionsUrl = ['/login', '/auth/forgot/password', '/auth/guest/reset-password']
//     const url = req.url
//     console.log('URL:', url)
//     if (!exceptionsUrl.includes(url)) {
//       try {
//         const token = (req.headers.authorization as string).replace('Bearer ', '')
//         const tokenValue = await this.jwtService.verifyAsync(token, {
//             secret: this.configService.get('jwt.privateKey'),
//           })
//
//         ;(req as any).profile = {
//           accountId: tokenValue.profile?.accountId ?? '',
//           name: tokenValue.profile?.name ?? '',
//           email: tokenValue.profile?.email ?? '',
//           avatar: tokenValue.profile?.avatar ?? '',
//           role: {
//             name: tokenValue.profile?.role?.name ?? '',
//             description: tokenValue.profile?.role?.description ?? '',
//             level: tokenValue.profile?.role?.level ?? 0,
//             permissions: tokenValue.profile?.role?.permissions ?? [],
//           },
//           preferences: tokenValue.profile?.preferences ?? [],
//         }
//
//
//         req.headers['x-idempotency-key']
//       } catch (e: any) {
//         console.error(e)
//         throw new UnauthorizedException()
//       }
//     }
//     next()
//   }
// }

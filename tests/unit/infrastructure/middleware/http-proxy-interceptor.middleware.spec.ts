import { UnauthorizedException } from '@nestjs/common'
import { HttpProxyInterceptorMiddleware } from '@/presentation/middlewares/http-proxy-interceptor/http-proxy-interceptor.middleware'

describe('HttpProxyInterceptorMiddleware', () => {
  let middleware: HttpProxyInterceptorMiddleware
  let jwtServiceMock: any
  let configServiceMock: any
  let req: any
  let res: any
  let next: jest.Mock

  beforeEach(() => {
    jwtServiceMock = {
      verifyAsync: jest.fn(),
    }
    configServiceMock = {
      get: jest.fn().mockReturnValue('testPrivateKey'),
    }

    middleware = new HttpProxyInterceptorMiddleware(configServiceMock, jwtServiceMock)

    req = {
      url: '',
      headers: {},
    }
    res = {}
    next = jest.fn()
  })

  it('should call next for exception URLs without token', async () => {
    req.url = '/login'

    await middleware.use(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(jwtServiceMock.verifyAsync).not.toHaveBeenCalled()
  })

  it('should throw UnauthorizedException if token is missing on protected route', async () => {
    req.url = '/protected'

    await expect(middleware.use(req, res, next)).rejects.toThrow(UnauthorizedException)
    expect(jwtServiceMock.verifyAsync).not.toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it('should throw UnauthorizedException if token is invalid', async () => {
    req.url = '/protected'
    req.headers.authorization = 'Bearer invalidtoken'
    jwtServiceMock.verifyAsync.mockRejectedValue(new UnauthorizedException('Invalid token'))

    await expect(middleware.use(req, res, next)).rejects.toThrow(UnauthorizedException)
    expect(jwtServiceMock.verifyAsync).toHaveBeenCalledWith('invalidtoken', { secret: 'testPrivateKey' })
    expect(next).not.toHaveBeenCalled()
  })

  it('should enrich headers and call next on valid token', async () => {
    req.url = '/protected'
    req.headers.authorization = 'Bearer validtoken'
    jwtServiceMock.verifyAsync.mockResolvedValue({
      user: { username: 'testuser', role: 'ADMIN' },
      userId: '123',
    })

    await middleware.use(req, res, next)

    expect(req.headers.username).toBe('testuser')
    expect(req.headers.user_id).toBe('123')
    expect(req.headers.roles).toEqual(['ADMIN'])
    expect(next).toHaveBeenCalled()
  })
})

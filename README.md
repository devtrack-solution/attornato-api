<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Project Checklist: api-template

This checklist provides an overview of the project's implemented features and highlights areas that need improvement or additional development.

### ✅ Implemented Features
- [x] **Nest.js Basic Logger**: Basic logging capabilities integrated into the application.
- [x] **Docker Development**:
    - [x] Dockerized Nest.js application.
    - [x] Redis container for caching.
    - [x] PostgreSQL container for database management.
- [x] **Testing**:
    - [x] Add unit tests for core services.
    - [x] Create end-to-end tests for API endpoints.
- [x] **Configuration**:
    - [x] Basic configuration management for development and production environments.
    - [x] Support for environment variables.
    - [x] Support for Docker configuration.
    - [x] Support for different configuration files.
    - [x] Support for configuration overrides.
    - [x] Support for configuration validation.
    - [x] Support for configuration defaults.
    - [x] Support for configuration encryption.
- [x] **API Documentation**:
    - [x] Swagger API documentation.
    - [ ] Compodoc API documentation.
    - [ ] Postman collection.
    - [ ] OpenAPI Specification.
    - [ ] RAML.
- [x] **Authentication**:
    - [x] Basic authentication system.
    - [ ] Support for user registration.
    - [ ] Support for user login.
    - [ ] Support for user logout.
    - [ ] Support for user password reset.
    - [ ] Support for user profile management.
    - [ ] Support for user account deletion.
    - [ ] Support for user account recovery.
    - [ ] Support for user account verification.
    - [ ] Support for user account suspension.
    - [ ] Support for user account roles.
    - [ ] Support for user account permissions.
    - [ ] Support for user account ACL.
    - [ ] Support for user account JWT.
    - [ ] Support for user account OAuth.
    - [ ] Support for user account SSO.
    - [ ] Support for user account MFA.
    - [ ] Support for user account TOTP.
    - [ ] Support for user account U2F.
    - [ ] Support for user account WebAuthn.
    - [ ] Support for user account SAML.
    - [ ] Support for user account OIDC.
    - [ ] Support for user account SCIM.
    - [ ] Support for user account LDAP.
    - [ ] Support for user account Kerberos.
    - [ ] Support for user account NTLM.
    - [ ] Support for user account RADIUS.
    - [ ] Support for user account OAuth2.
    - [ ] Support for user account OpenID.
    - [ ] Support for user account SAML2.
    - [ ] Support for user account WS-Federation.
--
### 🛠️ Features to Improve or Implement
- [ ] **Configuration**:
    - [ ] Add support for environment variables by Docker.
    - [ ] Implement configuration management for different environments.
    - [ ] Add support for configuration files.
    - [ ] Add support for configuration overrides.
---
- [ ] **Internacionalization**
    -  [ ] Implements i18n
        - [ ] pt
        - [ ] en
        - [ ] es
---
- [ ] **Enhance Nest.js Logger with wiston and OpenTelemetry**:
    - [ ] Aspect.js
    - [ ] Support for expiration time logging.
    - [ ] Support for size file logging via environment variables.
    - [ ] Make expiration time configurable via environment variables.
    - [ ] Log expiration-related events more clearly.
    - [ ] Add support for different log levels (e.g., debug, info, error).
    - [ ] Enable structured logging for better log analysis by otel (OpenTelemetry)
---
- [ ] **Docker Configuration**:
    - [ ] Optimize Dockerfile for production builds.
    - [ ] Optimize Dockerfile for homologation builds.
    - [ ] Include health checks for Redis and PostgreSQL containers.
    - [ ] Add volume support for persistent data storage in PostgreSQL.
---
- [ ] **Authentication**: Secure user authentication.
    - [ ] Implement JWT JSON WebTokens.
    - [ ] Implement token refresh mechanism.
    - [ ] Support for ACL (Access Control List).
    - [ ] Implement [OAuth2](https://oauth.net/2/) Authenticator 
        - [ ] Facebook
        - [ ] Google
        - [ ] LinkedIn
        - [ ] Apple
---
- [ ] **Documentation**:
    - [ ] Provide detailed setup instructions for Docker containers.
    - [ ] Add examples for using the JWT authentication system.
    - [ ] Add examples for using OAuth authentication system.
    - [ ] Include API documentation for key endpoints.
    - [ ] Compodoc.
    - [ ] Swagger configured via environment variables.
---
- [x] **Testing**:
    - [ ] Create test to infrastructure
        - [ ] envorments configuration
    - [ ] Automock
---
- [ ] **Resilience**:
    - [ ] **Throttling**:
        - [ ] Handle with multiple request  
    - [ ] **Idempotence key**:  
        - [ ] Suporte to idempotence key in RESTful.
        - [ ] Cache time configurable via environment variables.
---
## 🚀 Future Enhancements
- [ ] **CI/CD Pipeline**: Add automated testing and deployment pipeline.
    - [ ] ***Code Quality***
        - [ ] Create server SNYK
        - [ ] Create server SonarQube
        - [ ] Configure SNYK
        - [ ] Configure SonarQube
        - [ ] Improve tests
        - [ ] Get 90% coverage
---
- [ ] **Monitoring**: Integrate tools like Prometheus or Grafana for system monitoring.
    - [ ] Configure Grafana
    - [ ] Configure Protheus
    - [ ] Integrate Logs
        - [ ] Divide logs by sections (system, business, database...) 
---
- [ ] **Scalability**:
    - [ ] Implement Redis clustering for enhanced caching performance.
    - [ ] Support for database replication in PostgreSQL.
---
  - [ ] **Handling**:
    - [ ] Exception filters
    - [ ] Guards 
    - [ ] Interceptors 
    - [ ] Health checks 
    - [ ] CQRS - Saga
---

Feel free to contribute or suggest additional improvements!

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

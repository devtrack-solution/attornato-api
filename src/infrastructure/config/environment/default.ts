export default () => ({
  environment: 'DEFAULT',
  label: 'My Application',
  appServer: 'http://localhost',
  port: process.env.PORT || 3000,
  apiKey: 'default-key',
  database: {
    host: 'localhost',
    port: 5432,
  },
  enableCors: {
    origin: ['http://0.0.0.0:4200', 'http://localhost:4200', 'http://localhost:4201', 'http://localhost:3010', 'http://localhost:3000'],
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET', 'OPTIONS'],
  },
  loggerLevel: ['log', 'error', 'warn', 'debug', 'verbose'],
})

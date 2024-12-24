export default () => ({
  environment: 'development',
  label: process.env.label,
  appServer: process.env.appServer,
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
  },
  apiKey: process.env.API_KEY,
})

export interface AppConfig {
  label: string
  appServer: string
  port: number
  database: {
    host: string
    port: number
  }
  apiKey: string
}

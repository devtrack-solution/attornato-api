export interface AppConfig {
  label: string
  appServer: string
  port: number
  apiKey: string
  database: {
    host: string
    port: number
  }
}

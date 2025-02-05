import * as process from 'process'

export default (): any => ({
  version: process.env.APP_VERSION,
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  label: process.env.APP_LABEL,
  corsConfig: process.env.APP_CORS_CONFIG,
  appServer: process.env.APP_SERVER_PATH,
  database: {
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT ? parseInt(process.env.TYPEORM_PORT, 10) : undefined,
    name: process.env.TYPEORM_DATABASE,
    user: process.env.TYPEORM_USERNAME,
    pass: process.env.TYPEORM_PASSWORD,
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB,
  },
  jwt: {
    publicKey: Buffer.from(process.env.JWT_PUBLIC_KEY_BASE64 ?? '', 'base64').toString('utf8'),
    privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY_BASE64 ?? '', 'base64').toString('utf8'),
    accessTokenExpiresInSec: parseInt(process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC ?? '0', 10),
    refreshTokenExpiresInSec: parseInt(process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC ?? '0', 10),
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    SES: {
      sesFrom: process.env.AWS_SES_FROM,
    },
    S3: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
      bucketName: process.env.AWS_S3_REPOSITORY,
    },
    SQS: {
      knowledgeToLearning: process.env.AWS_SQS_KNOWLEDGE_BASE_TO_LEARNING_MQ,
      productTroubleshootMq: process.env.AWS_SQS_PRODUCT_TROUBLESHOOT_MQ,
      mailSenderMq: process.env.AWS_SQS_MAIL_SENDER_QUEUE,
      synthesiPendingMq: process.env.AWS_SQS_SYNTHESI_PENDING_TO_PROCCESS_MQ,
      rotuloValidationToPendingProcess: process.env.AWS_SQS_ROTULO_VALIDATION_PENDING_TO_PROCESS_MQ,
    },
    SNS: {
      eventCreateScheduleTopic: process.env.AWS_SNS_EVENT_CREATE_SCHEDULE,
      eventDeleteScheduleTopic: process.env.AWS_SNS_EVENT_DELETE_SCHEDULE,
      eventSendEmailTopic: process.env.AWS_SNS_EVENT_SEND_EMAIL,
      eventAnotherScheduleTopic: process.env.AWS_SNS_EVENT_ANOTHER_SCHEDULE,
    },
  },
  smtp: {
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASS,
    },
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    embeddingModel: process.env.OPENAI_EMBEDDING_MODEL,
    systemDialogue: process.env.OPENAI_SYSTEM_DIALOGUE,
  },
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY,
    index: process.env.PINECONE_INDEX,
    environment: process.env.PINECONE_ENVIRONMENT,
    baseUrl: process.env.PINECONE_BASE_URL,
    namespace: process.env.PINECONE_NAMESPACE,
  },
  rag: {
    chunkSize: process.env.CHUNK_SIZE,
    chunkOverlap: process.env.CHUNK_OVERLAP,
    vectorDimensions: process.env.VECTOR_DIMENSIONS,
  },
  defaultAdminUserPassword: process.env.DEFAULT_ADMIN_USER_PASSWORD,
})

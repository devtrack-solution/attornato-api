import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { typeOrmConfig } from "@/infrastructure/config/typeorm.config";
config();


const AppDataSource = new DataSource(Object.assign(typeOrmConfig))

export default AppDataSource
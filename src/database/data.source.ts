import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  connectTimeoutMS: 5000,
  logging: true,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['src/**/*.migration.{ts,js}'],
};
export const AppDataSource = new DataSource({ ...config });

import { AppDataSource } from './data.source';

describe('AppDataSource', () => {
  it('should create a new DataSource instance', () => {
    expect(AppDataSource).toBeDefined();
  });

  it('should have the correct configuration', () => {
    const expectedConfig = {
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

    expect(AppDataSource.options).toEqual(expectedConfig);
  });
});

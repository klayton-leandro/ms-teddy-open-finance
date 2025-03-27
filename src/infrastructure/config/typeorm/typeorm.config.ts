import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClientEntity } from '../../entities/client.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'monkey',
  password: process.env.DB_PASSWORD || undefined, // Sem senha
  database: process.env.DB_NAME || 'postgres',
  schema: process.env.DATABASE_SCHEMA || 'teddy_finance',
  entities: [ClientEntity],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations',
};
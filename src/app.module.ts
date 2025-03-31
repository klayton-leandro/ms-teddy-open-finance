import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { typeOrmConfig } from './infrastructure/config/typeorm/typeorm.config';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    RepositoriesModule,
    PassportModule,
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
  ],
  providers: [],
})
export class AppModule { }

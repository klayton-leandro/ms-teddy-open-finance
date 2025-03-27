import { DynamicModule, Module } from '@nestjs/common';
import { addClientUseCases } from '../../usecases/client/addClient.usecases';
import { deleteClientUseCases } from '../../usecases/client/deleteClient.usecases';
import { GetClientUseCases } from '../../usecases/client/getClient.usecases';
import { GetClientAllUseCases } from '../../usecases/client/getClients.usecases';
import { updateClientUseCases } from '../../usecases/client/updateClient.usecases';
// import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
// import { LoginUseCases } from '../../usecases/auth/login.usecases';
// import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { ClientDatabaseRepository } from '../repositories/client.repository';


import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, ClientDatabaseRepository, ExceptionsModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  static GET_CLIENT_USECASE_PROXY = 'getTodoUsecasesProxy';
  static GET_CLIENT_ALL_USECASE_PROXY = 'getTodosUsecasesProxy';
  static POST_CLIENT_USECASE_PROXY = 'postTodoUsecasesProxy';
  static DELETE_CLIENT_USECASE_PROXY = 'deleteTodoUsecasesProxy';
  static PUT_CLIENT_USECASE_PROXY = 'putTodoUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        // {
        //   inject: [LoggerService, JwtTokenService, EnvironmentConfigService, ClientDatabaseRepository, BcryptService],
        //   provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
        //   useFactory: (
        //     logger: LoggerService,
        //     jwtTokenService: JwtTokenService,
        //     config: EnvironmentConfigService,
        //     userRepo: ClientDatabaseRepository,
        //     bcryptService: BcryptService,
        //   ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
        // },
        // {
        //   inject: [ClientDatabaseRepository],
        //   provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        //   useFactory: (userRepo: ClientDatabaseRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        // },
        // {
        //   inject: [],
        //   provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        //   useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        // },
        {
          inject: [ClientDatabaseRepository],
          provide: UsecasesProxyModule.GET_CLIENT_ALL_USECASE_PROXY,
          useFactory: (clientRepository: ClientDatabaseRepository) => new UseCaseProxy(new GetClientAllUseCases(clientRepository)),
        },
        {
          inject: [ClientDatabaseRepository],
          provide: UsecasesProxyModule.GET_CLIENT_USECASE_PROXY,
          useFactory: (clientRepository: ClientDatabaseRepository) => new UseCaseProxy(new GetClientUseCases(clientRepository)),
        },
        {
          inject: [LoggerService, ClientDatabaseRepository],
          provide: UsecasesProxyModule.POST_CLIENT_USECASE_PROXY,
          useFactory: (logger: LoggerService, clientRepository: ClientDatabaseRepository) =>
            new UseCaseProxy(new addClientUseCases(logger, clientRepository)),
        },
        {
          inject: [LoggerService, ClientDatabaseRepository],
          provide: UsecasesProxyModule.PUT_CLIENT_USECASE_PROXY,
          useFactory: (logger: LoggerService, clientRepository: ClientDatabaseRepository) =>
            new UseCaseProxy(new updateClientUseCases(logger, clientRepository)),
        },
        {
          inject: [LoggerService, ClientDatabaseRepository],
          provide: UsecasesProxyModule.DELETE_CLIENT_USECASE_PROXY,
          useFactory: (logger: LoggerService, clientRepository: ClientDatabaseRepository) =>
            new UseCaseProxy(new deleteClientUseCases(logger, clientRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_CLIENT_USECASE_PROXY,
        UsecasesProxyModule.GET_CLIENT_ALL_USECASE_PROXY,
        UsecasesProxyModule.POST_CLIENT_USECASE_PROXY,
        UsecasesProxyModule.PUT_CLIENT_USECASE_PROXY,
        UsecasesProxyModule.DELETE_CLIENT_USECASE_PROXY,
        // UsecasesProxyModule.LOGIN_USECASES_PROXY,
        // UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        // UsecasesProxyModule.LOGOUT_USECASES_PROXY,
      ],
    };
  }
}
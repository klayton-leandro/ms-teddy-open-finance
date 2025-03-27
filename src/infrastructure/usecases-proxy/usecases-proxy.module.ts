import { DynamicModule, Module } from '@nestjs/common';
import { addClientUseCases } from '../../usecases/client/addClient.usecases';
import { deleteClientUseCases } from '../../usecases/client/deleteClient.usecases';
import { GetClientUseCases } from '../../usecases/client/getClient.usecases';
import { GetClientAllUseCases } from '../../usecases/client/getClients.usecases';
import { updateClientUseCases } from '../../usecases/client/updateClient.usecases';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_CLIENT_USECASE_PROXY = 'GetClientUseCases';
  static GET_CLIENT_ALL_USECASE_PROXY = 'GetClientAllUseCases';
  static POST_CLIENT_USECASE_PROXY = 'addClientUseCases';
  static DELETE_CLIENT_USECASE_PROXY = 'deleteClientUseCases';
  static PUT_CLIENT_USECASE_PROXY = 'updateClientUseCases';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: ['ClientRepository'],
          provide: UsecasesProxyModule.GET_CLIENT_ALL_USECASE_PROXY,
          useFactory: (repository) => new UseCaseProxy(new GetClientAllUseCases(repository)),
        },
        {
          inject: ['ClientRepository'],
          provide: UsecasesProxyModule.GET_CLIENT_USECASE_PROXY,
          useFactory: (repository) => new UseCaseProxy(new GetClientUseCases(repository)),
        },
        {
          inject: [LoggerService, 'ClientRepository'],
          provide: UsecasesProxyModule.POST_CLIENT_USECASE_PROXY,
          useFactory: (logger, repository) =>
            new UseCaseProxy(new addClientUseCases(logger, repository)),
        },
        {
          inject: [LoggerService, 'ClientRepository'],
          provide: UsecasesProxyModule.PUT_CLIENT_USECASE_PROXY,
          useFactory: (logger, repository) =>
            new UseCaseProxy(new updateClientUseCases(logger, repository)),
        },
        {
          inject: [LoggerService, 'ClientRepository'],
          provide: UsecasesProxyModule.DELETE_CLIENT_USECASE_PROXY,
          useFactory: (logger, repository) =>
            new UseCaseProxy(new deleteClientUseCases(logger, repository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_CLIENT_USECASE_PROXY,
        UsecasesProxyModule.GET_CLIENT_ALL_USECASE_PROXY,
        UsecasesProxyModule.POST_CLIENT_USECASE_PROXY,
        UsecasesProxyModule.PUT_CLIENT_USECASE_PROXY,
        UsecasesProxyModule.DELETE_CLIENT_USECASE_PROXY,
      ],
    };
  }
}
import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { ClientController } from './client/client.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [ClientController],
  providers: [],
})

export class ControllersModule { }
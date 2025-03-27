import { Module } from '@nestjs/common';
import { ClientController } from './client/client.controller';

@Module({
  controllers: [ClientController],
})
export class ControllersModule { }
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../entities/client.entity';
import { ClientDatabaseRepository } from './client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [
    {
      provide: 'ClientRepository',
      useClass: ClientDatabaseRepository,
    },
  ],
  exports: ['ClientRepository'],
})
export class RepositoriesModule { }
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../domain/model/client';
import { ClientRepository } from '../../domain/repositories/clientRepository.interface';
import { Client as ClientEntity } from '../entities/client.entity';

@Injectable()
export class ClientDatabaseRepository implements ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly todoEntityRepository: Repository<ClientEntity>,
  ) { }

  async updateContent(id: number): Promise<void> {
    await this.todoEntityRepository.update(
      {
        id: id,
      },
      { updateddate: new Date() },
    );
  }
  async insert(todo: Client): Promise<Client> {
    const todoEntity = this.toClientEntity(todo);
    const result = await this.todoEntityRepository.insert(todoEntity);
    return this.client(result.generatedMaps[0] as Client);
  }
  async findAll(): Promise<Client[]> {
    const todosEntity = await this.todoEntityRepository.find();
    return todosEntity.map((todoEntity) => this.client(todoEntity));
  }
  async findById(id: number): Promise<Client> {
    const todoEntity = await this.todoEntityRepository.findOneOrFail({ where: { id } });
    return this.client(todoEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.todoEntityRepository.delete({ id: id });
  }

  private client(clientEntity: ClientEntity): Client {
    const client: Client = new Client();

    client.id = clientEntity.id;
    client.name = clientEntity.name;
    client.salary = clientEntity.salary;
    client.company_name = clientEntity.company_name;
    client.company_salary = clientEntity.company_salary;
    client.createdate = clientEntity.createdate;
    client.updateddate = clientEntity.updateddate;

    return client;
  }

  private toClientEntity(client: Client): Client {
    const clientEntity: Client = new Client();

    client.id = client.id;
    client.name = client.name;
    client.salary = client.salary;
    client.company_name = client.company_name;
    client.company_salary = client.company_salary;
    client.createdate = client.createdate;
    client.updateddate = client.updateddate;

    return clientEntity;
  }
}
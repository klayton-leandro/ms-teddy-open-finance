import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../domain/model/client';
import { ClientRepository } from '../../domain/repositories/clientRepository.interface';
import { ClientEntity } from '../entities/client.entity';

@Injectable()
export class ClientDatabaseRepository implements ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) { }

  async update(id: number): Promise<void> {
    await this.clientRepository.update(
      { id },
      { updateddate: new Date() },
    );
  }

  async insert(client: Client): Promise<Client> {
    const clientEntity = this.entity(client);
    const result = await this.clientRepository.insert(clientEntity);
    return this.execute(result.generatedMaps[0] as ClientEntity);
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientRepository.find();
    return clients.map(this.execute);
  }

  async findById(id: number): Promise<Client> {
    const client = await this.clientRepository.findOneOrFail({ where: { id } });
    return this.execute(client);
  }

  async deleteById(id: number): Promise<void> {
    await this.clientRepository.delete({ id });
  }

  private execute(clientEntity: ClientEntity): Client {
    const client = new Client();
    client.id = clientEntity.id;
    client.name = clientEntity.name;
    client.salary = clientEntity.salary;
    client.company_name = clientEntity.company_name;
    client.company_salary = clientEntity.company_salary;
    client.createdate = clientEntity.createdate;
    client.updateddate = clientEntity.updateddate;
    return client;
  }

  private entity(client: Client): ClientEntity {
    const clientEntity = new ClientEntity();
    clientEntity.name = client.name;
    clientEntity.salary = client.salary;
    clientEntity.company_name = client.company_name;
    clientEntity.company_salary = client.company_salary;
    clientEntity.createdate = client.createdate;
    clientEntity.updateddate = client.updateddate;
    return clientEntity;
  }
}
import { ILogger } from '../../domain/logger/logger.interface';
import { Client } from '../../domain/model/client';
import { ClientRepository } from '../../domain/repositories/clientRepository.interface';

export class addClientUseCases {
  constructor(private readonly logger: ILogger, private readonly clientRepository: ClientRepository) { }
  async execute(name: string): Promise<Client> {
    const client = new Client();
    client.name = name
    const result = await this.clientRepository.insert(client);
    this.logger.log('addTodoUseCases execute', 'New Client have been inserted');
    return result;
  }
}
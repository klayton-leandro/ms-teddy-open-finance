import { ILogger } from '../../domain/logger/logger.interface';
import { Client } from '../../domain/model/client';
import { ClientRepository } from '../../domain/repositories/clientRepository.interface';

export class addClientUseCases {
  constructor(private readonly logger: ILogger, private readonly clientRepository: ClientRepository) { }
  async execute({
    name,
    salary,
    company_name,
    company_salary
  }): Promise<Client> {
    const client = new Client();
    client.name = name
    client.salary = salary
    client.company_name = company_name
    client.company_salary = company_salary
    const result = await this.clientRepository.insert(client);
    this.logger.log('addTodoUseCases execute', 'New Client have been inserted');
    return result;
  }
}
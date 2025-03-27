import { ILogger } from '../../domain/logger/logger.interface';
import { ClientRepository } from '../../domain/repositories/clientRepository.interface';

export class updateClientUseCases {
  constructor(private readonly logger: ILogger, private readonly clientRepository: ClientRepository) { }
  async execute(id: number, name: string, salary: number, company_salary: number): Promise<void> {
    const result = await this.clientRepository.update(id, name, salary, company_salary);
    this.logger.log('addTodoUseCases execute', 'Update Client');
    return result;
  }
}
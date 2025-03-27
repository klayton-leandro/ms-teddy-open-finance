import { ILogger } from '../../domain/logger/logger.interface';
import { ClientRepository } from '../../domain/repositories/clientRepository.interface';

export class deleteClientUseCases {
  constructor(private readonly logger: ILogger, private readonly clientRepository: ClientRepository) { }

  async execute(id: number): Promise<void> {
    await this.clientRepository.deleteById(id);
    this.logger.log('deleteClientUseCases execute', `Client ${id} have been deleted`);
  }
}
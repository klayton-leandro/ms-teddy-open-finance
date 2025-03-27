import { Client } from '../../domain/model/client';
import { ClientRepository } from '../../domain/repositories/clientRepository.interface';

export class GetClientUseCases {
  constructor(private readonly clientRepository: ClientRepository) { }
  async execute(id: number): Promise<Client> {
    return await this.clientRepository.findById(id);
  }
}
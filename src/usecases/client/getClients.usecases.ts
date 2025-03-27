import { Client } from '../../domain/model/client';
import { ClientRepository } from '../../domain/repositories/clientRepository.interface';

export class GetClientAllUseCases {
  constructor(private readonly clientRepository: ClientRepository) { }
  async execute(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }
}
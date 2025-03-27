import { Client } from '../model/client';

export interface ClientRepository {
  updateContent(id: number): Promise<void>;
  insert(client: Client): Promise<Client>;
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client>;
  deleteById(id: number): Promise<void>;
}
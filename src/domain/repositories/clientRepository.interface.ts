import { Client } from '../model/client';

export interface ClientRepository {
  insert(client: Client): Promise<Client>;
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client>;
  updateContent(id: number): Promise<void>;
  deleteById(id: number): Promise<void>;
}
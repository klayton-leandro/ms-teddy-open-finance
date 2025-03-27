import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../../domain/model/client';

export class ClientPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  salary: number;
  @ApiProperty()
  company_name: string;
  @ApiProperty()
  company_salary: number;
  @ApiProperty()
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(client: Client) {
    this.id = client.id;
    this.name = client.name;
    this.salary = client.salary;
    this.company_name = client.company_name;
    this.company_salary = client.company_salary;
    this.createdate = client.createdate;
    this.updateddate = client.updateddate;

  }
}
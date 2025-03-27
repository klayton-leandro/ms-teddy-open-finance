import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  salary: number;

  @Column({ name: 'company_name' })
  company_name: string;

  @Column({ name: 'company_salary', type: 'decimal' })
  company_salary: number;

  @Column({ name: 'createdate', type: 'timestamp' })
  createdate: Date;

  @Column({ name: 'updateddate', type: 'timestamp', nullable: true })
  updateddate: Date;
}
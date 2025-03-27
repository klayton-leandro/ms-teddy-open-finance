import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  name: string;

  @Column('number', { default: 0 })
  salary: number;

  @Column('varchar', { length: 255, nullable: true })
  company_name: string;

  @Column('number', { default: 0 })
  company_salary: number;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
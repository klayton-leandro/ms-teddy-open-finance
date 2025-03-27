import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsObject, isNumber } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}

export class AddClientDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly salary: number;
  @IsString()
  readonly company_name: string;
  @IsNumber()
  readonly company_salary: string
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsObject, isNumber } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly salary: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly company_salary: number
}

export class AddClientDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  readonly salary: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly company_name: string;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  readonly company_salary: number
}
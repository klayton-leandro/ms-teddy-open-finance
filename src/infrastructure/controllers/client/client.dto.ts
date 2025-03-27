import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  readonly content: string;
}
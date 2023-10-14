import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsNumber()
  costPrice: number;

  @ApiProperty()
  @IsNumber()
  sellingPrice: number;

  @ApiProperty()
  @IsNumber()
  quantityAvailable: number;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  description: string;
}

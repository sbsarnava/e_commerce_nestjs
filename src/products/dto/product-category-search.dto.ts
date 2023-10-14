import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductCategorySearchDTO {
  @ApiProperty()
  @IsString()
  category: string;
}

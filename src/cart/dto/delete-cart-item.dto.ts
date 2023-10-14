import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteCartitem {
  @ApiProperty()
  @IsNumber()
  cartItemId: number;
}

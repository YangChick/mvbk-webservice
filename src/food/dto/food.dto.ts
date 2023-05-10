import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
const dayjs = require('dayjs');

export class FoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: string;
}

export class FilterFoodDto {
  name: string;
  price: string;
}

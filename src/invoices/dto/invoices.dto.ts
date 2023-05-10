import { Food } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';
import { FoodDto } from 'src/food/dto';

export class InvoicesDto {
  @IsString()
  totalMoney: string;

  @IsString()
  client: string;

  @IsString()
  movieTheaterId: string;

  @IsArray()
  listSeats: string;

  @IsString()
  movieName: string;

  @IsString()
  showTimeId: string;

  @IsString()
  paymentNumber: string;

  @IsString()
  phoneNumber: string;

  foods: string[];
}

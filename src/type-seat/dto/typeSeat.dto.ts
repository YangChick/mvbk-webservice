import { IsString, IsNotEmpty } from 'class-validator';

export class TypeSeatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: string;
}

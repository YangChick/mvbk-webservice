import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SeatDto {

  @IsString()
  status: string;

  @IsString()
  typeSeatId: string;

  @IsString()
  name: string;
}

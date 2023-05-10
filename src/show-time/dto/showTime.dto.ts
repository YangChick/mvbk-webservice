import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
const dayjs = require('dayjs');

export class FilterShowTimeDto {
  keyword: string;
  date: string;

  limit: number;
  page: number;
}

export class ShowTimeDto {
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @Transform(({ value }) => dayjs(value, 'MM-DD-YYYY').format('MM/DD/YYYY'))
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  movieId: string;

  @IsString()
  @IsNotEmpty()
  movieTheaterId: string;

  @IsString()
  @IsNotEmpty()
  movieName: string;
}

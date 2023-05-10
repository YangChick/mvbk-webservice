import { IsOptional, IsString, Validate } from 'class-validator';
export class MovieTheaterDto {
  @IsOptional()
  name: string;
}

export class CreateTheaterDto {
  @IsString()
  name: string;
}

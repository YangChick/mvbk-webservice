import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class MoviesDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  @IsNotEmpty()
  movieDuration: string;

  @IsString()
  limitedAudience: string;

  // @IsString()
  // image?: any;

  @IsString()
  releaseDate: string;
}

import { Module } from '@nestjs/common';
import { MovieTheaterService } from './movie-theater.service';

@Module({
  providers: [MovieTheaterService],
})
export class MovieTheaterModule {}

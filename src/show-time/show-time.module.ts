import { Module } from '@nestjs/common';
import { ShowTimeService } from './show-time.service';
import { ShowTimeController } from './show-time.controller';
import { MoviesService } from 'src/movies/movies.service';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { MovieTheaterService } from 'src/movie-theater/movie-theater.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [ShowTimeService, MoviesService, MovieTheaterService],
  controllers: [ShowTimeController],
})
export class ShowTimeModule {}

import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { MoviesService } from 'src/movies/movies.service';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { MovieTheaterService } from 'src/movie-theater/movie-theater.service';
import { AWSService } from 'aws/aws.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [FoodService, MoviesService, MovieTheaterService, AWSService],
  controllers: [FoodController],
})
export class FoodModule {}

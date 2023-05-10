import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { AWSService } from 'aws/aws.service';
import { HttpModule } from '@nestjs/axios';
import { ShowTimeService } from 'src/show-time/show-time.service';

@Module({
  imports: [AWSService,  HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    }),
  })],
  providers: [MoviesService, AWSService,ShowTimeService],
  controllers: [MoviesController],
})
export class MoviesModule {}

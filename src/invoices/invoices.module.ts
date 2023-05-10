import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { MailService } from 'src/mail/mail.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { MovieTheaterService } from 'src/movie-theater/movie-theater.service';
import { SeatService } from 'src/seat/seat.service';
import { ShowTimeService } from 'src/show-time/show-time.service';
import { FoodService } from 'src/food/food.service';
import { MoviesService } from 'src/movies/movies.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AWSService } from 'aws/aws.service';

@Module({
  imports: [
    MailerModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    MailService,
    MovieTheaterService,
    SeatService,
    ShowTimeService,
    MoviesService,
    FoodService,
    AWSService,
  ],
})
export class InvoicesModule {}

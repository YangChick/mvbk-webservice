import { Module } from '@nestjs/common';
import { AWSService } from 'aws/aws.service';
import { SeatController } from './seat.controller';
import { SeatService } from './seat.service';

@Module({
  imports: [],
  providers: [SeatService],
  controllers: [SeatController],
})

export class SeatModule {}

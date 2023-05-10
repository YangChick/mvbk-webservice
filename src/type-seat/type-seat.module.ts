import { Module } from '@nestjs/common';
import { TypeSeatService } from './type-seat.service';
import { TypeSeatController } from './type-seat.controller';

@Module({
  providers: [TypeSeatService],
  controllers: [TypeSeatController]
})
export class TypeSeatModule {}

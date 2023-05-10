import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { failResponse, successResponse } from 'helper/reponse.helper';
import { SeatService } from './seat.service';
import { SeatDto } from './dto';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  async createSeat(@Body() dto: SeatDto) {
    const result = await this.seatService.createSeat(dto);

    // if (!result)
    //   return failResponse({
    //     message: 'Create Seat Faild',
    //   });

    return successResponse({
      message: 'Create Seat Success',
      payload: result,
    });
  }

  @Get()
  async getAllSeat() {
    const result = await this.seatService.getAllSeats();

    if (!result)
      return failResponse({
        message: 'Fetch Seat Faild',
      });

    return successResponse({
      message: 'Fetch Seat Success',
      payload: result,
    });
  }

  @Put('')
  async updateSeatStatus(
    @Body()
    dto: {
      listSeat: string[];
      status: string;
    },
  ) {
    const listSeats = await this.seatService.getSeatsByIds(dto.listSeat);
    if (!listSeats)
      return failResponse({
        message: ' Seat Do Not Exist',
      });
    const result = await this.seatService.updateSeatStatus(
      dto.status,
      listSeats,
    );
    if (!result)
      return failResponse({
        message: 'Update Seat Faild',
      });

    return successResponse({
      message: 'Update Seat Success',
      payload: result,
    });
  }
}

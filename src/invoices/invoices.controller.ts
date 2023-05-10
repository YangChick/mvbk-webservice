import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { failResponse, successResponse } from 'helper/reponse.helper';
import { InvoicesDto } from './dto/invoices.dto';
import { InvoicesService } from './invoices.service';
import { MailService } from 'src/mail/mail.service';
import { MovieTheaterService } from 'src/movie-theater/movie-theater.service';
import { SeatService } from 'src/seat/seat.service';
import { ShowTimeService } from 'src/show-time/show-time.service';
import { FoodService } from 'src/food/food.service';

@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly mailService: MailService,
    private readonly movieTheaterService: MovieTheaterService,
    private readonly seatService: SeatService,
    private readonly showTimeService: ShowTimeService,
    private readonly foodService: FoodService,
  ) {}

  @Post()
  async createInvoice(@Body() dto: InvoicesDto) {
    const result = await this.invoicesService.createInvoice(dto);
    if (!result) return failResponse({ message: 'Create invoices failed' });
    const movieTheater = await this.movieTheaterService.findById(
      result.movieTheaterId,
    );
    const showTime = await this.showTimeService.getShowTimeById(
      result.showTimeId,
    );
    const newListFood = await Promise.all(
      dto.foods.map(async (food) => {
        const item = await this.foodService.getFoodById(food);
        return item;
      }),
    );
    const listSeat = await this.seatService.getSeatsByIds(result.listSeats);
    const dataToMail = {
      to: dto.client,
      date: showTime.date,
      time: showTime.time,
      movieTheater: movieTheater.name,
      listSeats: listSeat,
      listFood: newListFood,
    };

    const sendMail = await this.mailService.sendMailToClient(dataToMail);
    if (!sendMail)
      failResponse({ message: 'Create invoices failed! Send Mail Fail' });
    return successResponse({
      message: 'Create invoices success',
      payload: result,
    });
  }

  @Get()
  async getAllInvoices(@Query() req: any) {
    const result = await this.invoicesService.getAllInvoies(req);

    if (!result) failResponse({ message: 'Create invoices failed' });
    const newResult: any[] = [];
    await Promise.all(
      result.map(async (invoice) => {
        const listSeats = await this.seatService.getSeatsByIds(
          invoice.listSeats,
        );
        const foods = await this.foodService.getFoodsByIds(invoice.foods);
        const showTime = await this.showTimeService.getShowTimeById(
          invoice.showTimeId,
        );
        const movieTheaterId = await this.movieTheaterService.findById(
          invoice.movieTheaterId,
        );
        return newResult.push({
          ...invoice,
          listSeats,
          foods,
          showTime,
          movieTheaterId,
        });
      }),
    );
    return successResponse({
      message: 'Create invoices success',
      payload: newResult,
    });
  }

  @Get('/:phoneNumber')
  async getInvoiesByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    const result = await this.invoicesService.getInvoiesByPhoneNumber(
      phoneNumber,
    );

    if (!result) failResponse({ message: 'Create invoices failed' });
    return successResponse({
      message: 'Create invoices success',
      payload: result,
    });
  }
}

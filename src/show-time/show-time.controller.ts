import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { failResponse, successResponse } from 'helper/reponse.helper';
import { MovieTheaterService } from 'src/movie-theater/movie-theater.service';
import { MoviesService } from 'src/movies/movies.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShowTimeDto } from './dto';
import { ShowTimeService } from './show-time.service';
import { FilterShowTimeDto } from './dto/showTime.dto';
import { ShowTime as ShowTimeModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('show-time')
export class ShowTimeController {
  constructor(
    private readonly showTimeService: ShowTimeService,
    private readonly prisma: PrismaService,
    private readonly moviesService: MoviesService,
    private readonly movieTheaterService: MovieTheaterService,
  ) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  // @UseGuards(AuthGuard('jwt'))
  async createShowTime(@Body() dto: ShowTimeDto) {
    const movieName = await this.moviesService.getFilmsById(dto.movieId);
    if (!movieName) {
      return {
        status: false,
        message: 'Movie is not exits',
      };
    }
    const IsExitShowTime = await this.prisma.showTime.findFirst({
      where: {
        time: dto.time,
        movieTheaterId: dto.movieTheaterId,
      },
    });
    if (IsExitShowTime) {
      return {
        status: false,
        message: 'Show Time is  exits',
      };
    }

    const movieTheaterName = await this.prisma.movieTheater.findUnique({
      where: {
        id: dto.movieTheaterId,
      },
    });

    if (!movieTheaterName) {
      return {
        status: false,
        message: 'Movie Theater is not exits',
      };
    }

    const result = await this.showTimeService.createShowTime(dto);

    if (!result) {
      return failResponse({
        message: 'Create Show Time Failed',
      });
    }

    return successResponse({
      message: 'Create Show time Success',
      payload: {
        ...result,
        movies: movieName,
      },
    });
  }

  @Get('/movie/:id')
  async getShowTimeByMoiveId(@Param('id') id: string) {
    const result = await this.showTimeService.getShowTimeByMovieId(id);
    if (!result) {
      return failResponse({
        message: 'Faild to get show time',
      });
    }
    return successResponse({
      message: 'Get show time success fully',
      payload: result,
    });
  }

  @Get('/:id')
  async getShowTimeById(@Param('id') id: string) {
    const result = await this.showTimeService.getShowTimeById(id);
    if (!result) {
      return failResponse({
        message: 'Faild to get show time',
      });
    }
    return successResponse({
      message: 'Get show time success fully',
      payload: result,
    });
  }

  @Get('')
  async getAllShowTime(@Query() query: FilterShowTimeDto) {
    const result = await this.showTimeService.getAllShowTime(query);
    const newPayload: any[] = [];
    await Promise.all(
      result.map(async (item) => {
        const movie = await this.moviesService.getFilmsById(item.movieId);
        const movieTheaterName = await this.movieTheaterService.findById(
          item.movieTheaterId,
        );
        newPayload.push({
          id: item.id,
          date: item.date,
          movieName: movie.original_title,
          time: item.time,
          movieTheaterName: movieTheaterName.name,
        });
      }),
    );
    if (!result) {
      return failResponse({
        message: 'Faild to get all show time',
      });
    }
    return successResponse({
      message: 'Get all show time success fully',
      payload: newPayload,
    });
  }

  // @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateShowTime(@Param('id') id: string, @Body() body: ShowTimeDto) {
    const showTime = await this.showTimeService.getShowTimeById(id);
    // const newEntity = {
    //   ...isExistShowTime,
    //   seats: isExistShowTime.seats,
    // };
    if (!showTime)
      return failResponse({
        message: 'Show time dose not exist',
      });
    const updateRecord = await this.showTimeService.updateShowTime(
      body,
      showTime,
      showTime.seats,
    );

    if (!updateRecord)
      return failResponse({
        message: 'Show time update failed',
      });

    return successResponse({
      message: 'Show time update Success',
      payload: updateRecord,
    });
  }

  // @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteShowTime(@Param('id') id: string) {
    const showTime = await this.showTimeService.getShowTimeById(id);
    if (!showTime)
      return failResponse({
        message: 'Delete show time failed! Show time dose not exist',
      });
    const result = await this.showTimeService.deleteShowTime(id);
    if (!result)
      return failResponse({
        message: 'Delete show time failed!',
      });
    return successResponse({
      message: 'Delete show time successfully',
      payload: true,
    });
  }
}
//nestjs
//typescript let a:number function(): number
// javascript let a;

//nodejs

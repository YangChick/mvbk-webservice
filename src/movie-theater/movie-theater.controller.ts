import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { failResponse, successResponse } from 'helper/reponse.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieTheaterDto } from './dto';
import { MovieTheaterService } from './movie-theater.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie-theater')
export class MovieTheaterController {
  constructor(
    private readonly movieTheaterService: MovieTheaterService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async fetchMovieTheater(@Query() query: MovieTheaterDto) {
    const result = await this.movieTheaterService.fetchMovieTheater(query);

    // if (!result)
    //   return failResponse({
    //     message: 'Create Movie Theater Failed',
    //   });

    return successResponse({
      message: 'Fetch Movie Theater Success',
      payload: result,
    });
  }

  @Get('/:id')
  async getMovieTheaterById(@Param('id') id: string) {
    const result = await this.movieTheaterService.findById(id);

    if (!result)
      return failResponse({
        message: 'Create Movie Theater Failed',
      });
    return successResponse({
      message: 'Fetch Movie Theater Success',
      payload: result,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createMovietheater(@Body() dto: MovieTheaterDto) {
    const isExitsName = await this.movieTheaterService.checkDuplicateName(
      dto.name,
    );
    if (isExitsName)
      return failResponse({
        message: 'Create Movie Theater Failed! Name is duplicate!',
      });

    const result = await this.movieTheaterService.createMovietheater(dto);

    if (!result)
      return failResponse({
        message: 'Create Movie Theater Failed',
      });

    return successResponse({
      message: 'Create Movie Success',
      payload: result,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async updateMovieTheater(
    @Param() param: { id: string },
    @Body() dto: MovieTheaterDto,
  ) {
    const isExitsName = await this.movieTheaterService.checkDuplicateName(
      dto.name,
      param.id,
    );
    if (isExitsName)
      return failResponse({
        message: 'Update Movie Theater Failed! Duplicate',
      });

    const entity = await this.movieTheaterService.findById(param.id);

    const isSameName = entity.name === dto.name;
    if (isSameName)
      return failResponse({
        message: 'Update Movie Theater Failed! Name are not change',
      });

    const result = await this.movieTheaterService.updateMovieTheater(
      entity,
      dto,
    );

    if (!result)
      return failResponse({
        message: 'Update Movie Theater Failed',
      });

    return successResponse({
      message: 'Update Movie Success',
      payload: result,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteMovieTheater(@Param('id') id: string) {
    const isExistShowTime = await this.movieTheaterService.findById(id);
    if (!isExistShowTime)
      return failResponse({
        message: 'Movie Theater dose not exist',
      });
    const removeRecord = await this.movieTheaterService.removeRecord(
      isExistShowTime,
    );
    if (!removeRecord)
      return failResponse({
        message: 'Movie Theater remove failed',
      });
    return successResponse({
      message: 'Movie Theater dose not exist',
      payload: removeRecord,
    });
  }
}

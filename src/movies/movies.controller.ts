import {
  Controller,
  UseInterceptors,
  Get,
  Post,
  UploadedFile,
  Query,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoviesService } from './movies.service';
import { MoviesDto } from './dto';
import { AWSService } from 'aws/aws.service';
import { failResponse, successResponse } from 'helper/reponse.helper';
import { ShowTimeService } from 'src/show-time/show-time.service';
@Controller('movies')
@UseInterceptors()
export class MoviesController {
  constructor(
    private readonly movieService: MoviesService,
    private readonly awsService: AWSService,
    private readonly prisma: PrismaService,
    private readonly showTimeService: ShowTimeService,
  ) {}
  // upload single file
  // @Get()
  // async getAllMovies() {
  //   const listMovie = await this.movieService.getAllMovies();
  //   if (!listMovie)
  //     return failResponse({
  //       message: 'Fetch movie faild!',
  //     });
  //   else {
  //     return successResponse({
  //       message: 'Fetch movie success!',
  //       payload: listMovie,
  //     });
  //   }
  // }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('image'))
  // async upload(
  //   @Body() dto: MoviesDto,
  //   @UploadedFile() image: Express.Multer.File,
  // ) {
  //   const fileUploaded = await this.awsService.uploadFile(image);

  //   if (!fileUploaded) return failResponse({ message: 'Upload file failed!' });

  //   const entity = await this.movieService.upload(dto, fileUploaded);

  //   if (!entity) failResponse({ message: 'Create movie failed!' });

  //   return successResponse({
  //     message: 'Create movie success!',
  //     payload: entity,
  //   });
  // }

  // @Delete('delete/:id')
  // @UseInterceptors(FileInterceptor('image'))
  // async delete(@Param('id') id: string) {
  //   const movieItem = await this.prisma.movies.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   //remove file in aws
  //   if (!movieItem) {
  //     return {
  //       status: false,
  //       message: 'Movie is not Exits',
  //     };
  //   }
  //   const delFileAws = await this.awsService.deleteFile(movieItem.imageKey);
  //   if (!delFileAws)
  //     return {
  //       status: false,
  //       message: 'Delete File Failed',
  //     };
  //   //remove file in db
  //   const deleteMovie = this.movieService.deleteMovie(id);
  //   if (!deleteMovie) {
  //     return failResponse({
  //       message: 'Delete Movie Failed',
  //     });
  //   } else
  //     return successResponse({
  //       message: 'Delete Movie Success',
  //       payload: [],
  //     });
  // }

  @Get('list/page/:page')
  async findAll(@Param('page') page: number) {
    const result = await this.movieService.findAll(page);
    if (!result) {
      return failResponse({
        message: 'Get Movies Failed',
      });
    } else
      return successResponse({
        message: 'Get Move sucesss fully',
        payload: result,
      });
  }

  @Get('list/movie/:id')
  async getFilmsById(@Param('id') id: string) {
    const result = await this.movieService.getFilmsById(id);
    if (!result) {
      return failResponse({
        message: 'Get Movies Failed',
      });
    }
    return successResponse({
      message: 'Get Move sucesss fully89',
      payload: result,
    });
  }

  @Get('list/movie-available')
  async getAvailableFilms() {
    const availableShowTime =
      await this.showTimeService.getAllAvailableShowTime();

    if (availableShowTime.length === 0)
      return failResponse({
        message: 'Get Movies Failed',
      });

    const availableMovies = await this.movieService.getAvailableMovies(
      availableShowTime,
    );
    console.log(availableMovies);
    return successResponse({
      message: 'Get Movie sucesssfully',
      payload: availableMovies,
    });
  }
}

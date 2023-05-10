import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MoviesDto } from './dto';
import { HttpService } from '@nestjs/axios/dist';
import { Param } from '@nestjs/common/decorators';

@Injectable()
export class MoviesService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  // async getAllMovies() {
  //   const listMovie = await this.prisma.movies.findMany();
  //   return listMovie;
  // }

  // async upload(
  //   dto: MoviesDto,
  //   file: {
  //     ETag: string;
  //     Key: string;
  //     Location: string;
  //   },
  // ) {
  //   const data = {
  //     name: dto.name,
  //     category: dto.category,
  //     movieDuration: dto.movieDuration,
  //     limitedAudience: dto.limitedAudience,
  //     image: file.Location,
  //     releaseDate: dto.releaseDate,
  //     imageKey: file.Key,
  //   };

  //   return await this.prisma.movies.create({
  //     data: data,
  //   });
  // }
  // async deleteMovie(id: string) {
  //   const movieItem = await this.prisma.movies.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   if (!movieItem) {
  //     return {
  //       status: false,
  //       message: 'Movie is not exits',
  //     };
  //   }
  //   return await this.prisma.movies.delete({ where: { id: id } });
  // }

  async getFilmsById(movie_id: string) {
    const response = await this.httpService
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=a21d016d2fc8285615f57a66201f31c5&language=en-US`,
      )
      .toPromise()
      .catch((err) => {
        throw new HttpException('Error', HttpStatus.BAD_REQUEST);
      });
    if (response) return response.data;
  }

  async findAll(page: number) {
    const response = await this.httpService
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a21d016d2fc8285615f57a66201f31c5&language=en-US&page=${page}`,
      )
      .toPromise()
      .catch((err) => {
        throw new HttpException('Error', HttpStatus.BAD_REQUEST);
      });
    return response.data;
  }

  async getAvailableMovies(movieIds: string[]) {
    const response = [];
    for (const movieId of movieIds) {
      const movie = await this.getFilmsById(movieId);
      if (!movie?.status_code) response.push(movie);
    }
    return response;
  }
}

import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShowTimeDto } from './dto';
import SEATS from '../../initial/seat.initial';
import { MoviesService } from 'src/movies/movies.service';
import { retry } from 'rxjs';
import { query } from 'express';
import { FilterShowTimeDto } from './dto/showTime.dto';
import dayjs from 'dayjs';
import { Seats, ShowTime, ShowTime as ShowTimeModel } from '@prisma/client';

@Injectable()
export class ShowTimeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movies: MoviesService,
  ) {}

  async createShowTime(dto: ShowTimeDto) {
    try {
      const result = await this.prisma.showTime.create({
        data: {
          time: dto.time,
          date: dto.date,
          movieId: dto.movieId,
          movieTheaterId: dto.movieTheaterId,
          movieName: dto.movieName,
          seats: {
            createMany: {
              data: SEATS,
            },
          },
        },
        include: {
          seats: true,
        },
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllShowTime(query: FilterShowTimeDto) {
    const { limit = 0, keyword = '', date } = query;
    const result = await this.prisma.showTime.findMany({
      skip: 0,
      take: parseInt(limit.toString(), 10),
      where: {
        AND: [
          {
            ...(keyword ? { movieName: { contains: keyword } } : {}),
            ...(date ? { date: { contains: date } } : {}),
          },
        ],
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return result;
  }

  async getShowTimeByMovieId(movieId: string) {
    try {
      const result = await this.prisma.showTime.findMany({
        where: {
          movieId: movieId,
        },
        include: {
          seats: true,
        },
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getShowTimeById(id: string) {
    try {
      const result = await this.prisma.showTime.findUnique({
        where: {
          id: id,
        },
        include: {
          seats: true,
        },
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllAvailableShowTime() {
    try {
      const currentDate =
        (new Date().getMonth() + 1 >= 10
          ? new Date().getMonth() + 1
          : '0' + (new Date().getMonth() + 1)) +
        '/' +
        (new Date().getDate() >= 10
          ? new Date().getDate()
          : '0' + new Date().getDate()) +
        '/' +
        new Date().getFullYear();
      const result = await this.prisma.showTime.groupBy({
        by: ['movieId'],
        where: {
          date: {
            gte: currentDate,
          },
        },
      });
      const resolveMovieIds = result.map(
        (item: { movieId: string }) => item.movieId,
      );
      return resolveMovieIds;
    } catch (err) {
      console.log(err);
    }
  }

  async updateShowTime(
    body: ShowTimeDto,
    showTime: ShowTimeModel,
    seats: Seats[],
  ) {
    try {
      // if ('seats' in body) {
      //   // Check if the seats property is a valid array
      //   if (!Array.isArray(body.seats)) {
      //     throw new Error('Invalid seats property: expected an array');
      //   }

      //   // Check if each item in the array is a valid object with the required properties
      //   for (const seat of body.seats) {
      //     if (
      //       !('name' in seat) ||
      //       !('status' in seat) ||
      //       !('typeSeatId' in seat) ||
      //       !('showTimeId' in seat)
      //     ) {
      //       throw new Error(
      //         'Invalid seat object: expected an object with properties name, status, typeSeatId, and showTimeId',
      //       );
      //     }
      //   }
      // }
      // console.log({
      //   ...entity,
      //   ...body,
      // });
      const updateShowTime = await this.prisma.showTime.update({
        where: {
          id: body.id,
        },
        data: {
          movieId: body.movieId,
          date: body.date,
          time: body.time,
          movieTheaterId: body.movieTheaterId,
        },
      });
      return updateShowTime;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteShowTime(id: string) {
    try {
      const deleteShowTime = await this.prisma.showTime.delete({
        where: {
          id: id,
        },
      });
      return deleteShowTime;
    } catch (err) {
      throw new Error(err);
    }
  }
}

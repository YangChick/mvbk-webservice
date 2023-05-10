import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieTheaterDto } from './dto';
import { MovieTheater as MovieTheaterModel } from '@prisma/client';
import { CreateTheaterDto } from './dto/movieTheater.dto';

@Injectable()
export class MovieTheaterService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchMovieTheater(query: MovieTheaterDto) {
    const { name } = query;
    const movieTheater = await this.prisma.movieTheater.findMany({
      where: {
        AND: [
          {
            ...(name ? { name: { contains: name } } : {}),
          },
        ],
      },
      orderBy: {
        updatedAt: 'asc',
      },
    });

    return movieTheater;
  }

  async findById(id: string) {
    const movieTheater = await this.prisma.movieTheater.findUnique({
      where: {
        id,
      },
    });

    return movieTheater;
  }

  async createMovietheater(dto: MovieTheaterDto) {
    const movieTheater = await this.prisma.movieTheater.create({
      data: {
        name: dto.name,
      },
    });

    return movieTheater;
  }

  async updateMovieTheater(entity: MovieTheaterModel, dto: CreateTheaterDto) {
    const movieTheater = await this.prisma.movieTheater.update({
      where: {
        id: entity.id,
      },
      data: {
        ...entity,
        ...dto,
      },
    });
    return movieTheater;
  }

  async checkDuplicateName(name: string, id?: string) {
    const movieTheater = await this.prisma.movieTheater.findFirst({
      where: {
        name,
        NOT: {
          id,
        },
      },
    });

    return movieTheater;
  }
  async removeRecord(recordRemove: any) {
    try {
      const removeRecord = await this.prisma.movieTheater.delete({
        where: {
          id: recordRemove.id,
        },
      });
      return removeRecord;
    } catch (err) {
      console.log(err);
    }
  }
}

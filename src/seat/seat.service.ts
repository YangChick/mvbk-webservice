import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeatDto } from './dto';

@Injectable()
export class SeatService {
  constructor(private readonly prisma: PrismaService) {}

  async createSeat(dto: SeatDto) {
    // return await this.prisma.seats.create({
    //   data: dto,
    // });
  }

  async getAllSeats() {
    const result = await this.prisma.seats.findMany();
    return result;
  }

  async getSeatsByIds(ids: string[]) {
    try {
      const result = await this.prisma.seats.findMany({
        where: {
          id: { in: ids },
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getSeatById(id: string) {
    try {
      const updateSeat = await this.prisma.seats.findUnique({
        where: {
          id: id,
        },
      });
      return updateSeat;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateSeatStatus(status: string, listSeats: any) {
    try {
      const seatsIds: string = listSeats.map((item: any) => item.id);
      const updateSeat = await this.prisma.seats.updateMany({
        where: {
          id: { in: seatsIds },
        },
        data: {
          status: status,
        },
      });
      return updateSeat;
    } catch (err) {
      throw new Error(err);
    }
  }
}

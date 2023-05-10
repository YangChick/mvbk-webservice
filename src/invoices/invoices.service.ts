import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvoicesDto } from './dto/invoices.dto';
import { FoodDto } from 'src/food/dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async createInvoice(dto: InvoicesDto) {
    try {
      const newInvoices = await this.prisma.invoices.create({
        data: {
          totalMoney: dto.totalMoney,
          client: dto.client,
          movieTheaterId: dto.movieTheaterId,
          listSeats: dto.listSeats,
          movieName: dto.movieName,
          paymentNumber: dto.paymentNumber,
          phoneNumber: dto.phoneNumber,
          showTimeId: dto.showTimeId,
          foods: dto.foods,
        },
      });
      return newInvoices;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllInvoies(query: any) {
    try {
      const { keywork } = query;
      const listInvoices = await this.prisma.invoices.findMany({
        where: {
          AND: [
            {
              ...(keywork ? { client: { contains: keywork } } : {}),
            },
            {
              ...(keywork ? { phoneNumber: { contains: keywork } } : {}),
            },
          ],
        },
        orderBy: {
          client: 'desc',
        },
      });
      return listInvoices;
    } catch (err) {
      console.log(err);
    }
  }

  async getInvoiesByPhoneNumber(phoneNumber: string) {
    try {
      const listInvoices = await this.prisma.invoices.findFirst({
        where: {
          phoneNumber: phoneNumber,
        },
      });
      return listInvoices;
    } catch (err) {
      console.log(err);
    }
  }
}

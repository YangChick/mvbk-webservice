import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeSeatDto } from './dto/typeSeat.dto';

@Injectable()
export class TypeSeatService {
    constructor(private readonly prisma:PrismaService){}

    async createTypeSeat(dto:TypeSeatDto) {
        const result = await this.prisma.typeSeat.create({
            data:{
                name:dto.name,
                price:dto.price
            }
        })
        return result
    }

    async getAllTypeSeat() {
        const result = await this.prisma.typeSeat.findMany();
        return result
    }
}

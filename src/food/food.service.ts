import { Injectable, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodDto } from './dto';
import SEATS from '../../initial/seat.initial';
import { MoviesService } from 'src/movies/movies.service';
import { retry } from 'rxjs';
import { query } from 'express';
import dayjs from 'dayjs';
import { AWSService } from 'aws/aws.service';
import { Food, Food as FoodModel } from 'prisma/prisma-client';
import { FilterFoodDto } from './dto/food.dto';
@Injectable()
export class FoodService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aws: AWSService,
  ) {}

  async addFood(food: any) {
    try {
      const saveFood = await this.prisma.food.create({
        data: food,
      });
      return saveFood;
    } catch (err) {
      throw new Error(err);
    }
  }

  async removeFood(id: string) {
    try {
      const removeFood = await this.prisma.food.delete({
        where: {
          id: id,
        },
      });
      return removeFood;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getFoodById(id: string) {
    try {
      const food = await this.prisma.food.findUnique({
        where: {
          id: id,
        },
      });
      return food;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getFoodsByIds(ids: string[]) {
    try {
      const result = await this.prisma.food.findMany({
        where: {
          id: { in: ids },
        },
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAllFood(query: FilterFoodDto) {
    try {
      const { name, price } = query;
      const sql = await this.prisma.food.findMany({
        where: {
          AND: [
            {
              ...(name ? { name: { contains: name } } : {}),
            },
            {
              ...(price ? { price: { contains: price } } : {}),
            },
          ],
        },
        orderBy: {
          name: 'desc',
        },
      });
      return sql;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateFood(body: any, foodEntity: Food) {
    try {
      const updateFood = await this.prisma.food.update({
        where: {
          id: foodEntity.id,
        },
        data: {
          ...foodEntity,
          ...body,
        },
      });
      return updateFood;
    } catch (err) {
      throw new Error(err);
    }
  }
}

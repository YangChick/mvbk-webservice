import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { failResponse, successResponse } from 'helper/reponse.helper';
import { MovieTheaterService } from 'src/movie-theater/movie-theater.service';
import { MoviesService } from 'src/movies/movies.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodDto } from './dto';
import { FoodService } from './food.service';
import { AWSService } from 'aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilterFoodDto } from './dto/food.dto';

@Controller('food')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly prisma: PrismaService,
    private readonly moviesService: MoviesService,
    private readonly aws: AWSService,
  ) {}

  @Get()
  async getAllFood(@Query() query: FilterFoodDto) {
    const result = await this.foodService.getAllFood(query);
    if (!result) return failResponse({ message: 'Get Food Failed' });
    return successResponse({
      message: 'Get Fool Successfully',
      payload: result,
    });
  }

  @Get('/:id')
  async getAllFoodById(@Param('id') id: string) {
    const result = await this.foodService.getFoodById(id);
    if (!result) return failResponse({ message: 'Get Food Failed' });
    return successResponse({
      message: 'Get Fool Successfully',
      payload: result,
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async addFood(
    @UploadedFile() image: Express.Multer.File,
    @Body() food: FoodDto,
  ) {
    const saveImage = await this.aws.uploadFile(image);
    if (!saveImage)
      return failResponse({
        message: 'Add Food Fail! Have Error When Up Image To AWS',
      });
    const newBody = {
      ...food,
      image: saveImage.Location,
      imageKey: saveImage.Key,
    };
    const saveFood = await this.foodService.addFood(newBody);
    if (!saveFood)
      return failResponse({
        message: 'Add Food Fail!',
      });
    return successResponse({
      message: 'Add Food Success!',
      payload: saveFood,
    });
  }

  @Delete('/:id')
  async removeFood(@Param('id') id: string) {
    try {
      const food = await this.foodService.getFoodById(id);
      if (!food)
        return failResponse({ message: 'Remove Food Fail! Food Is Not Exist' });
      const removeFood = await this.foodService.removeFood(id);
      if (!removeFood) return failResponse({ message: 'Remove Food Fail!' });

      const removeImageFood = await this.aws.deleteFile(food.imageKey);
      if (!removeImageFood)
        return failResponse({
          message: 'Remove Food Fail! Have Error When Remove Image',
        });

      return successResponse({
        message: 'Remove Food Success!',
        payload: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateFood(
    @Param('id') id: string,
    @Body() body: { name: string; price: string },
    @UploadedFile() image?: Express.Multer.File,
  ) {
    try {
      const findFood = await this.foodService.getFoodById(id);
      let saveUpdate;
      if (!findFood)
        return failResponse({ message: 'Update Food Fail! Food Is Not Exist' });
      if (image) {
        if (findFood.imageKey) {
          const removeImageFood = await this.aws.deleteFile(findFood.imageKey);
          if (!removeImageFood) {
            return failResponse({
              message: 'Remove Food Fail! Have Error When Remove Image',
            });
          }
        }
        const updateImage = await this.aws.uploadFile(image);
        if (!updateImage)
          return failResponse({
            message: 'Update Food Fail! Have Error When Upload Image',
          });
        const newFood = {
          ...findFood,
          image: updateImage.Location,
          imageKey: updateImage.Key,
        };

        const saveUpdate = await this.foodService.updateFood(body, newFood);
        if (!saveUpdate)
          return failResponse({
            message: 'Update Food Fail! ',
          });
        return successResponse({
          message: 'Update Food Fail!',
          payload: saveUpdate,
        });
      }
      const newFood = {
        ...findFood,
        image: '',
        imageKey: '',
      };
      const saveUpdateWhenImageNull = await this.foodService.updateFood(
        body,
        newFood,
      );

      if (!saveUpdateWhenImageNull)
        return failResponse({
          message: 'Update Food Fail! ',
        });
      return successResponse({
        message: 'Update Food Success!',
        payload: saveUpdate,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

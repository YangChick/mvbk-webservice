import { Test, TestingModule } from '@nestjs/testing';
import { MovieTheaterController } from './movie-theater.controller';

describe('MovieTheaterController', () => {
  let controller: MovieTheaterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieTheaterController],
    }).compile();

    controller = module.get<MovieTheaterController>(MovieTheaterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

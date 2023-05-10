import { Test, TestingModule } from '@nestjs/testing';
import { TypeSeatController } from './type-seat.controller';

describe('TypeSeatController', () => {
  let controller: TypeSeatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeSeatController],
    }).compile();

    controller = module.get<TypeSeatController>(TypeSeatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

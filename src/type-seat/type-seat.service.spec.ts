import { Test, TestingModule } from '@nestjs/testing';
import { TypeSeatService } from './type-seat.service';

describe('TypeSeatService', () => {
  let service: TypeSeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeSeatService],
    }).compile();

    service = module.get<TypeSeatService>(TypeSeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MovieTheaterService } from './movie-theater.service';

describe('MovieTheaterService', () => {
  let service: MovieTheaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieTheaterService],
    }).compile();

    service = module.get<MovieTheaterService>(MovieTheaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

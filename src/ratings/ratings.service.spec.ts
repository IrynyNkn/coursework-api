import { Test, TestingModule } from '@nestjs/testing';
import { RatingsService } from './ratings.service';
import {PrismaService} from "../../prisma/prisma.service";

describe('RatingsService', () => {
  let service: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingsService, PrismaService],
    }).compile();

    service = module.get<RatingsService>(RatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GenresService } from './genres.service';
import {PrismaService} from "../../prisma/prisma.service";

describe('GenresService', () => {
  let service: GenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenresService, PrismaService],
    }).compile();

    service = module.get<GenresService>(GenresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

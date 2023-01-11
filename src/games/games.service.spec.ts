import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import {PrismaService} from "../../prisma/prisma.service";

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService, PrismaService],
    }).compile();

    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

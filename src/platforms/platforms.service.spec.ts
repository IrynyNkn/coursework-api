import { Test, TestingModule } from '@nestjs/testing';
import { PlatformsService } from './platforms.service';
import {PrismaService} from "../../prisma/prisma.service";

describe('PlatformsService', () => {
  let service: PlatformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformsService, PrismaService],
    }).compile();

    service = module.get<PlatformsService>(PlatformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

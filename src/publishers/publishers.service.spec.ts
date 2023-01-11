import { Test, TestingModule } from '@nestjs/testing';
import { PublishersService } from './publishers.service';
import {PrismaService} from "../../prisma/prisma.service";

describe('PublishersService', () => {
  let service: PublishersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublishersService, PrismaService],
    }).compile();

    service = module.get<PublishersService>(PublishersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

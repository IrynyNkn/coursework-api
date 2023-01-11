import { Test, TestingModule } from '@nestjs/testing';
import { PlatformsController } from './platforms.controller';
import { PlatformsService } from './platforms.service';
import {PrismaService} from "../../prisma/prisma.service";

describe('PlatformsController', () => {
  let controller: PlatformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformsController],
      providers: [PlatformsService, PrismaService],
    }).compile();

    controller = module.get<PlatformsController>(PlatformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

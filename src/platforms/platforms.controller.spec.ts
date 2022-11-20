import { Test, TestingModule } from '@nestjs/testing';
import { PlatformsController } from './platforms.controller';
import { PlatformsService } from './platforms.service';

describe('PlatformsController', () => {
  let controller: PlatformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatformsController],
      providers: [PlatformsService],
    }).compile();

    controller = module.get<PlatformsController>(PlatformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

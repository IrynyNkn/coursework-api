import { Test, TestingModule } from '@nestjs/testing';
import { PlatformsService } from './platforms.service';

describe('PlatformsService', () => {
  let service: PlatformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformsService],
    }).compile();

    service = module.get<PlatformsService>(PlatformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

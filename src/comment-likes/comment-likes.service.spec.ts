import { Test, TestingModule } from '@nestjs/testing';
import { CommentLikesService } from './comment-likes.service';

describe('CommentLikesService', () => {
  let service: CommentLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentLikesService],
    }).compile();

    service = module.get<CommentLikesService>(CommentLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

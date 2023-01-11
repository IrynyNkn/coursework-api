import { Test, TestingModule } from '@nestjs/testing';
import { CommentLikesController } from './comment-likes.controller';
import { CommentLikesService } from './comment-likes.service';
import {PrismaService} from "../../prisma/prisma.service";

describe('CommentLikesController', () => {
  let controller: CommentLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentLikesController],
      providers: [CommentLikesService, PrismaService],
    }).compile();

    controller = module.get<CommentLikesController>(CommentLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

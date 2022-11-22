import {Body, Controller, Post} from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import {CommentLikeDto} from "./dto/commentLike.dto";

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @Post()
  rateGame(@Body() dto: CommentLikeDto) {
    return this.commentLikesService.likeComment(dto);
  }
}

import {Body, Controller, Delete, Param, Post, UseGuards} from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import {CommentLikeDto} from "./dto/commentLike.dto";
import {JwtAuthGuard} from "../auth/jwt.guard";

@Controller('comment-likes')
@UseGuards(JwtAuthGuard)
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @Post()
  likeComment(@Body() dto: CommentLikeDto) {
    return this.commentLikesService.likeComment(dto);
  }

  @Delete(':id')
  removeLike(@Param() params: {id: string}) {
    return this.commentLikesService.removeLike(params.id);
  }
}

import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {CommentDto} from "./dto/comment.dto";
import {JwtAuthGuard} from "../auth/jwt.guard";

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  rateGame(@Body() dto: CommentDto) {
    return this.commentsService.addComment(dto);
  }
}

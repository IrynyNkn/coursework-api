import {Body, Controller, Post} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {CommentDto} from "./dto/comment.dto";

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  rateGame(@Body() dto: CommentDto) {
    return this.commentsService.addComment(dto);
  }
}

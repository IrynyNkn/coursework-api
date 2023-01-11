import {Body, Controller, Delete, Param, Post, UseGuards} from '@nestjs/common';
import { CommentsService } from './comments.service';
import {CommentDto} from "./dto/comment.dto";
import {JwtAuthGuard} from "../auth/jwt.guard";
import {Roles} from "../roles/roles.decorator";

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  comment(@Body() dto: CommentDto) {
    return this.commentsService.addComment(dto);
  }

  @Roles('manager', 'admin')
  @Delete(':id')
  deleteComment(@Param() params: {id: string}) {
    return this.commentsService.deleteComment(params.id);
  }
}

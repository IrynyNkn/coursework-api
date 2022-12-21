import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CommentLikesController } from './comment-likes.controller';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../auth/jwt.strategy";

@Module({
  imports: [JwtModule],
  controllers: [CommentLikesController],
  providers: [CommentLikesService, JwtStrategy]
})
export class CommentLikesModule {}

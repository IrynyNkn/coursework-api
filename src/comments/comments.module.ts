import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {JwtStrategy} from "../auth/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  controllers: [CommentsController],
  providers: [CommentsService, JwtStrategy]
})
export class CommentsModule {}

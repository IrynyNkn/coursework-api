import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {PrismaModule} from "../prisma/prisma.module";
import { UsersModule } from './users/users.module';
import { PlatformsModule } from './platforms/platforms.module';
import { PublishersModule } from './publishers/publishers.module';
import { GenresModule } from './genres/genres.module';
import { GamesModule } from './games/games.module';
import { CommentsModule } from './comments/comments.module';
import { CommentLikesModule } from './comment-likes/comment-likes.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, PlatformsModule, PublishersModule, GenresModule, GamesModule, CommentsModule, CommentLikesModule, RatingsModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

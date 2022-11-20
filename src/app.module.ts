import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {PrismaModule} from "../prisma/prisma.module";
import { UsersModule } from './users/users.module';
import { PlatformsModule } from './platforms/platforms.module';
import { PublishersModule } from './publishers/publishers.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, PlatformsModule, PublishersModule, GenresModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

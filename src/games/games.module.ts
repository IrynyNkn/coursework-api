import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import {JwtStrategy} from "../auth/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {MulterModule} from "@nestjs/platform-express";

@Module({
  imports: [JwtModule, MulterModule.register({
    dest: './files',
  })],
  controllers: [GamesController],
  providers: [GamesService, JwtStrategy]
})
export class GamesModule {}

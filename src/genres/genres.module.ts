import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import {JwtStrategy} from "../auth/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  controllers: [GenresController],
  providers: [GenresService, JwtStrategy]
})
export class GenresModule {}

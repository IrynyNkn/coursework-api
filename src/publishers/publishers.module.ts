import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import {JwtStrategy} from "../auth/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  controllers: [PublishersController],
  providers: [PublishersService, JwtStrategy]
})
export class PublishersModule {}

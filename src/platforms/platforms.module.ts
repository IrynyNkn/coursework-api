import { Module } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { PlatformsController } from './platforms.controller';
import {JwtStrategy} from "../auth/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  controllers: [PlatformsController],
  providers: [PlatformsService, JwtStrategy]
})
export class PlatformsModule {}

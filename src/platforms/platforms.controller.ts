import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import {PlatformDto} from "./dto/platform.dto";
import {JwtAuthGuard} from "../auth/jwt.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";

@Controller('platforms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Roles('admin', 'manager')
  @Post()
  createPlatform(@Body() dto: PlatformDto) {
    return this.platformsService.createPlatform(dto);
  }

  @Roles('admin', 'manager')
  @Get()
  getPlatforms() {
    return this.platformsService.getPlatforms();
  }

  @Roles('admin', 'manager')
  @Get(':id')
  getPlatformById(@Param() params: {id: string}) {
    return this.platformsService.getPlatform(params.id);
  }
}

import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import {PlatformDto} from "./dto/platform.dto";

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Post()
  createPlatform(@Body() dto: PlatformDto) {
    return this.platformsService.createPlatform(dto);
  }

  @Get()
  getPlatforms() {
    return this.platformsService.getPlatforms();
  }

  @Get(':id')
  getPlatformById(@Param() params: {id: string}) {
    return this.platformsService.getPlatform(params.id);
  }
}

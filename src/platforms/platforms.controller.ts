import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import {PlatformDto} from "./dto/platform.dto";
import {JwtAuthGuard} from "../auth/jwt.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";
import {GenreDto} from "../genres/dto/genre.dto";

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Roles('admin', 'manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createPlatform(@Body() dto: PlatformDto) {
    return this.platformsService.createPlatform(dto);
  }

  @Roles('admin', 'manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  updatePlatform(@Param() params: {id: string}, @Body() dto: PlatformDto) {
    return this.platformsService.updatePlatform(params.id, dto);
  }

  @Get()
  getPlatforms() {
    return this.platformsService.getPlatforms();
  }

  @Get(':id')
  getPlatformById(@Param() params: {id: string}) {
    return this.platformsService.getPlatform(params.id);
  }

  @Roles('admin', 'manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deletePlatform(@Param() params: {id: string}) {
    return this.platformsService.deletePlatform(params.id);
  }
}

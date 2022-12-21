import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import { GenresService } from './genres.service';
import {GenreDto} from "./dto/genre.dto";
import {Roles} from "../roles/roles.decorator";
import {JwtAuthGuard} from "../auth/jwt.guard";
import {RolesGuard} from "../roles/roles.guard";

@Controller('genres')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Roles('admin', 'manager')
  @Post()
  createPublisher(@Body() dto: GenreDto) {
    return this.genresService.createGenre(dto);
  }

  @Roles('admin', 'manager')
  @Get()
  getPublishers() {
    return this.genresService.getGenres();
  }

  @Roles('admin', 'manager')
  @Get(':id')
  getPublisherById(@Param() params: {id: string}) {
    return this.genresService.getGenre(params.id);
  }
}

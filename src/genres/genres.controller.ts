import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
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
  createGenre(@Body() dto: GenreDto) {
    return this.genresService.createGenre(dto);
  }

  @Roles('admin', 'manager')
  @Patch(':id')
  updateGenre(@Param() params: {id: string}, @Body() dto: GenreDto) {
    return this.genresService.updateGenre(params.id, dto);
  }

  @Roles('admin', 'manager')
  @Get()
  getGenres() {
    return this.genresService.getGenres();
  }

  @Roles('admin', 'manager')
  @Get(':id')
  getGenreById(@Param() params: {id: string}) {
    return this.genresService.getGenre(params.id);
  }

  @Roles('admin', 'manager')
  @Delete(':id')
  deleteGenre(@Param() params: {id: string}) {
    return this.genresService.deleteGenre(params.id);
  }
}

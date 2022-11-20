import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { GenresService } from './genres.service';
import {PublisherDto} from "../publishers/dto/publisher.dto";
import {GenreDto} from "./dto/genre.dto";

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  createPublisher(@Body() dto: GenreDto) {
    return this.genresService.createGenre(dto);
  }

  @Get()
  getPublishers() {
    return this.genresService.getGenres();
  }

  @Get(':id')
  getPublisherById(@Param() params: {id: string}) {
    return this.genresService.getGenre(params.id);
  }
}

import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { GamesService } from './games.service';
import {GameDto} from "./dto/games.dto";

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  createGame(@Body() dto: GameDto) {
    return this.gamesService.createGame(dto);
  }

  @Get()
  getGames() {
    return this.gamesService.getGames();
  }

  @Get(':id')
  getGameById(@Param() params: {id: string}) {
    return this.gamesService.getGame(params.id);
  }
}

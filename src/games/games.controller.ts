import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Response,
  UseInterceptors, UploadedFile
} from '@nestjs/common';
import { GamesService } from './games.service';
import {JwtAuthGuard} from "../auth/jwt.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";
import { Response as Res } from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "../utils/games";

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getGames(@Query('skip') skip: string, @Query('take') take: string) {
    return this.gamesService.getGames({skip: Number(skip), take: Number(take)});
  }

  @Get(':id')
  getGameById(@Param() params: {id: string}, @Response() res) {
    return this.gamesService.getGame(params.id, res);
  }

  @Get('/image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Response() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Roles('manager', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  createGame(@UploadedFile() file: Express.Multer.File, @Body() body, @Response() res: Res) {
    const fileName = file?.filename;

    const createGameDto = {
      ...body,
      imageLink: fileName
    };

    try {
      createGameDto.genres = JSON.parse(body.genres);
      createGameDto.platforms = JSON.parse(body.platforms);
    } catch (e) {
      console.log('Error', e)
    }

    return this.gamesService.createGame(createGameDto, res);
  }

  @Roles('manager', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  updateGame(@UploadedFile() file: Express.Multer.File, @Param() params: {id: string}, @Body() dto, @Response() res: Res) {
    const fileName = file?.filename;

    const updateGameDto = {
      ...dto,
      imageLink: fileName
    };

    try {
      updateGameDto.genres = JSON.parse(dto.genres);
      updateGameDto.platforms = JSON.parse(dto.platforms);
    } catch (e) {
      console.log('Error', e)
    }

    return this.gamesService.updateGame(params.id, updateGameDto, res);
  }

  @Roles('manager', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteGame(@Param() params: {id: string}) {
    return this.gamesService.deleteGame(params.id);
  }
}

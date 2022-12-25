import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {GenreDto} from "./dto/genre.dto";

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async createGenre(dto: GenreDto) {
    const { name } = dto;
    const genre = await this.prisma.genre.create({
      data: {
        name
      }
    });

    return {
      message: 'Genre is successfully created',
      data: {
        id: genre.id
      }
    };
  };

  async updateGenre(id: string, dto: GenreDto) {
    const updatedGame = await this.prisma.genre.update({
      where: {
        id
      },
      data: {
        name: dto.name
      }
    });

    return {
      message: 'Genre is successfully updated',
      data: {
        id: updatedGame.id
      }
    };
  }

  async getGenre(id: string) {
    const genre = await this.prisma.genre.findUnique({where: {id}});
    return { data: genre };
  }

  async getGenres() {
    return await this.prisma.genre.findMany();
  }

  async deleteGenre(id: string) {
    await this.prisma.genre.delete({
      where: {id}
    });

    return { message: 'Genre is successfully deleted' };
  }
}

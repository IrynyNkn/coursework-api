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

  async getGenre(id: string) {
    const genre = await this.prisma.genre.findUnique({where: {id}});
    return { data: genre };
  }

  async getGenres() {
    return await this.prisma.genre.findMany();
  }
}

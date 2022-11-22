import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {GameDto} from "./dto/games.dto";

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async createGame(gameDto: GameDto) {
    const game = await this.prisma.game.create({
      data: {
        title: gameDto.title,
        description: gameDto.description,
        imageLink: gameDto.imageLink,
        ageRestriction: gameDto.ageRestriction,
        releaseYear: gameDto.releaseYear,
        publisher: {
          connect: {
            id: gameDto.publisherId
          }
        },
        genres: {
          create: gameDto.genres.map(genre => ({
            genre: {
              connect: {
                id: genre
              }
            }
          }))
        },
        platforms: {
          create: gameDto.platforms.map(platform => ({
            platform: {
              connect: {
                id: platform
              }
            }
          }))
        }
      }
    });

    return {
      message: 'Game is successfully created',
      data: {
        id: game.id
      }
    };
  }

  async getGame(id: string) {
    const game = await this.prisma.game.findUnique({where: {id}});
    return { data: game };
  }

  async getGames() {
    return await this.prisma.game.findMany();
  }
}

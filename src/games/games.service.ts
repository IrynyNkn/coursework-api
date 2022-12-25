import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {GameDto} from "./dto/games.dto";
import { Response as Res } from 'express';
import {apiUrl} from "../utils/constants";

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async createGame(gameDto: GameDto, res: Res) {
    const ageRestriction = Number(gameDto.ageRestriction);
    const releaseYear = Number(gameDto.releaseYear);

    if(typeof ageRestriction !== 'number' && typeof releaseYear !== 'number') {
      throw new BadRequestException('Invalid input');
    }

    const game = await this.prisma.game.create({
      data: {
        title: gameDto.title,
        description: gameDto.description,
        imageLink: gameDto.imageLink ? `games/image/${gameDto.imageLink}` : null,
        ageRestriction,
        releaseYear,
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

    return res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' }).json({
      message: 'Game is successfully created',
      data: {
        id: game.id
      }
    });
  }

  async getGame(id: string, res: Res) {
    const game = await this.prisma.game.findUnique({
      where: {id},
      include: {
        comments: {
          include: {
            commentLikes: true,
            user: {
              select: {
                userName: true,
                badgeColor: true
              }
            }
          }
        },
        ratings: true,
        publisher: true,
        genres: {
          select: {
            genre: true
          }
        },
        platforms: {
          select: {
            platform: true
          }
        },
      }
    });
    game.imageLink = `${apiUrl}/${game.imageLink}`

    return res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' }).json({
      data: game
    });
  }

  async getGames(params: {
    skip?: number;
    take?: number;
  }) {
    const { skip, take } = params;
    let gamesList = [];

    if (!skip && !take) {
      gamesList = await this.prisma.game.findMany({
        select: {
          id: true,
          title: true,
          publisher: true,
          genres: {
            select: {
              genre: true
            }
          },
          platforms: {
            select: {
              platform: true
            }
          },
          imageLink: true
        }
      });
    } else if (isNaN(skip)) {
      gamesList = await this.prisma.game.findMany({
        take
      });
    } else {
      gamesList = await this.prisma.game.findMany({
        skip,
        take,
        select: {
          id: true,
          title: true,
          publisher: true,
          genres: {
            select: {
              genre: true
            }
          },
          platforms: {
            select: {
              platform: true
            }
          },
          imageLink: true
        }
      });
      gamesList = gamesList.map(game => {
        if(game.imageLink) {
          return {
            ...game,
            imageLink: `${apiUrl}/${game.imageLink}`
          }
        }
        return game;
      })
    }

    const totalGamesCount = await this.prisma.game.count();

    return {
      message: 'Games list',
      meta: {
        totalCount: totalGamesCount,
        skip,
        take,
      },
      data: gamesList
    };
  }

  async updateGame(id: string, gameDto: GameDto, res: Res) {
    let updatedGame = null;
    const ageRestriction = Number(gameDto.ageRestriction);
    const releaseYear = Number(gameDto.releaseYear);

    if(typeof ageRestriction !== 'number' && typeof releaseYear !== 'number') {
      throw new BadRequestException('Invalid input');
    }
    if(gameDto.imageLink) {
      updatedGame = await this.prisma.game.update({
        where: {
          id
        },
        data: {
          title: gameDto.title,
          description: gameDto.description,
          imageLink: `games/image/${gameDto.imageLink}`,
          ageRestriction,
          releaseYear,
          publisher: {
            connect: {
              id: gameDto.publisherId
            }
          },
          genres: {
            deleteMany: {},
            create: gameDto.genres.map(genre => ({
              genreId: genre
            }))
          },
          platforms: {
            deleteMany: {},
            create: gameDto.platforms.map(plt => ({
              platformId: plt
            }))
          }
        },
      });
    } else {
      updatedGame = await this.prisma.game.update({
        where: {
          id
        },
        data: {
          title: gameDto.title,
          description: gameDto.description,
          ageRestriction,
          releaseYear,
          publisher: {
            connect: {
              id: gameDto.publisherId
            }
          },
          genres: {
            deleteMany: {},
            create: gameDto.genres.map(genre => ({
              genreId: genre
            }))
          },
          platforms: {
            deleteMany: {},
            create: gameDto.platforms.map(plt => ({
              platformId: plt
            }))
          }
        },
      })
    }

    return res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' }).json({
      message: 'Game is successfully updated',
      data: updatedGame
    });
  }

  async deleteGame(id: string) {
    await this.prisma.game.delete({
      where: {id}
    });

    return { message: 'Game is successfully deleted' };
  }
}

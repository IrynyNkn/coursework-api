import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {GameDto} from "./dto/games.dto";
import { Response as Res } from 'express';
import {apiUrl} from "../utils/constants";
import {calculateRating} from "../utils/games";

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
    const ratings = await this.prisma.rating.findMany({
      where: {
        gameId: id
      }
    });
    const gameRating = calculateRating(ratings);
    // @ts-ignore
    game.gameRating = gameRating;
    game.imageLink = `${apiUrl}/${game.imageLink}`

    return res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' }).json({
      data: game
    });
  }

  async getGames(params: {
    skip?: number;
    take?: number;
    genres?: string;
    platforms?: string;
    publishers?: string;
    searchQuery?: string;
  }) {
    const { skip, take, genres, platforms, publishers, searchQuery } = params;

    let gamesList = [];
    const genresValues = genres ? genres.split(',') : [];

    const platformsValues = platforms ? platforms.split(',') : [];
    const publishersValues = publishers ? publishers.split(',') : [];
    const toSkip = isNaN(skip) ? 0 : skip;
    const toTake = isNaN(take) ? undefined : take;

    const gamesFilter =  {
      title: searchQuery ? {
        contains: searchQuery,
      } : {},
      genres: genres ? {
        some: {
          genreId: {
            in : genresValues
          }
        }
      } : {},
      platforms: platforms ? {
        some: {
          platformId: {
            in: platformsValues
          }
        }
      } : {},
      publisherId: publishers ? {
        in: publishersValues
      } : {}
    };

    gamesList = await this.prisma.$transaction([
      this.prisma.game.count({
        where: gamesFilter,
      }),
      this.prisma.game.findMany({
        skip: toSkip,
        take: toTake,
        where: gamesFilter,
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
      })
    ]);

    return {
      message: 'Games list',
      meta: {
        totalCount: gamesList[0],
        skip,
        take,
      },
      data: gamesList[1].map(game => {
        if(game.imageLink) {
          return {
            ...game,
            imageLink: `${apiUrl}/${game.imageLink}`
          }
        }
        return game;
      })
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

import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {RatingDto} from "./dto/rating.dto";

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async rateGame(rateDto: RatingDto) {

    if(rateDto.ratingId) {
      await this.prisma.rating.update({
        where: {
          id: rateDto.ratingId
        },
        data: {
          value: rateDto.value
        }
      })
    } else {
      await this.prisma.rating.create({
        data: {
          user: {
            connect: {
              id: rateDto.userId
            }
          },
          game: {
            connect: {
              id: rateDto.gameId
            }
          },
          value: rateDto.value
        }
      })
    }

    return { message: 'Game is successfully rated' };
  }
}

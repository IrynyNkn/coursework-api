import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CommentDto} from "./dto/comment.dto";

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async addComment(comment: CommentDto) {
    if(comment.parentId) {
      await this.prisma.comment.create({
        data: {
          user: {
            connect: {
              id: comment.userId
            }
          },
          game: {
            connect: {
              id: comment.gameId
            }
          },
          value: comment.value,
          parent: {
            connect: {
              id: comment.parentId
            }
          }
        }
      })
    } else {
      await this.prisma.comment.create({
        data: {
          user: {
            connect: {
              id: comment.userId
            }
          },
          game: {
            connect: {
              id: comment.gameId
            }
          },
          value: comment.value,
        }
      })
    }

    return { message: 'Comment is successfully added' };
  }
}

import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CommentLikeDto} from "./dto/commentLike.dto";

@Injectable()
export class CommentLikesService {
  constructor(private prisma: PrismaService) {}

  async likeComment(comment: CommentLikeDto) {
    await this.prisma.commentLike.create({
      data: {
        user: {
          connect: {
            id: comment.userId
          }
        },
        comment: {
          connect: {
            id: comment.commentId
          }
        }
      }
    })

    return { message: 'Like is successfully added to the comment' }
  }

  async removeLike(id: string) {
    await this.prisma.commentLike.delete({
      where: {
        id
      }
    })

    return { message: 'Like is successfully removed from the comment' }
  }

}

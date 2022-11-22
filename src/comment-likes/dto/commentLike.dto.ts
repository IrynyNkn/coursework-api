import {IsUUID} from "class-validator";

export class CommentLikeDto {
  @IsUUID()
  public userId: string

  @IsUUID()
  public commentId: string
}
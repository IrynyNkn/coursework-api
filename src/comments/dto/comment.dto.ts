import {IsUUID, IsString, IsOptional} from "class-validator";

export class CommentDto {
  @IsUUID()
  public userId: string

  @IsUUID()
  public gameId: string

  @IsString()
  public value: string

  @IsUUID()
  @IsOptional()
  public parentId?: string | null
}
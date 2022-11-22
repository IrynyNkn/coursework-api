import {IsUUID, IsInt} from "class-validator";

export class RatingDto {
  @IsUUID()
  public userId: string

  @IsUUID()
  public gameId: string

  @IsInt()
  public value: number
}
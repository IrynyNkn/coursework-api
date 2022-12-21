import {IsUUID, IsInt, ValidateIf} from "class-validator";

export class RatingDto {
  @IsUUID()
  public userId: string

  @IsUUID()
  public gameId: string

  @IsInt()
  public value: number

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  public ratingId: string | null
}
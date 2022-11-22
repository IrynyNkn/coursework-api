import {IsNotEmpty, IsString, IsUUID, IsInt, IsArray} from "class-validator";

export class GameDto {
  @IsNotEmpty()
  @IsString()
  public title: string

  @IsNotEmpty()
  @IsString()
  public description: string

  @IsNotEmpty()
  @IsString()
  public imageLink: string

  @IsUUID()
  public publisherId: string

  @IsInt()
  public ageRestriction: number

  @IsInt()
  public releaseYear: number

  @IsArray()
  public genres: string[]

  @IsArray()
  public platforms: string[]

  @IsArray()
  public ratings: string[]

  @IsArray()
  public comments: string[]
}
import {IsNotEmpty, IsString, Length} from "class-validator";

export class PlatformDto {
  @IsNotEmpty()
  @IsString()
  public name: string
}
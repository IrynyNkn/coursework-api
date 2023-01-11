import {IsString} from "class-validator";

export class UpdUserDto {
  @IsString()
  public role: string
}
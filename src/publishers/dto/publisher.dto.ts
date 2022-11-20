import {IsNotEmpty, IsString, Length} from "class-validator";

export class PublisherDto {
  @IsNotEmpty()
  @IsString()
  public name: string
}
import {IsArray, ArrayMinSize} from "class-validator";

type UserRole = 'user' | 'admin' | 'manager'

export class UpdUserDto {
  @IsArray()
  @ArrayMinSize(1)
  public roles: UserRole[]
}
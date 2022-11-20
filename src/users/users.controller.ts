import {Controller, Get, Param, Req, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import {JwtAuthGuard} from "../auth/jwt.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: {id: string}, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}

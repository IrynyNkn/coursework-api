import {Controller, Get, Param, UseGuards, Headers, Delete, Patch, Body, Response} from '@nestjs/common';
import { UsersService } from './users.service';
import {JwtAuthGuard} from "../auth/jwt.guard";
import {RolesGuard} from "../roles/roles.guard";
import {UpdUserDto} from "./dto/updUser.dto";
import {Roles} from "../roles/roles.decorator";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RolesGuard)
  @Get('/me')
  getCurrentUser(@Headers() headers, @Response() res) {
    const token = headers.authorization.split(' ')[1];
    return this.usersService.getCurrentUser(token, res);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get(':id')
  getMyUser(@Param() params: {id: string}) {
    return this.usersService.getUser(params.id);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Patch(':id')
  updateUser(@Param() params: {id: string}, @Body() dto: UpdUserDto) {
    return this.usersService.changeUserRole(params.id, dto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteUser(@Param() params: {id: string}) {
    return this.usersService.deleteUser(params.id);
  }
}

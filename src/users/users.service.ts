import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import {UpdUserDto} from "./dto/updUser.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async getCurrentUser(token: string) {
    const decodedPayload = await this.decodeToken(token);

    const currentUser = await this.prisma.user.findUnique({
      where: {
        id: (decodedPayload as {[key: string]: any}).id
      }
    });

    return {
      data: currentUser
    };
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({where: {id}});
    return { user };
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: {id}
    })

    return { message: 'User is successfully deleted' }
  }

  async decodeToken(token: string) {
    return this.jwt.decode(token);
  }

  async changeUserRole(id: string, updUserDto: UpdUserDto) {
    console.log('Upd user', updUserDto)
    const updatedUser = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        roles: updUserDto.roles
      }
    })

    return {
      message: 'User is successfully updated',
      data: {
        id: updatedUser.id
      }
    }
  }
}

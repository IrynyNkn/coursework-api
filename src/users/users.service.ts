import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {Response as Res} from "express";
import {JwtService} from "@nestjs/jwt";
import {UpdUserDto} from "./dto/updUser.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async getCurrentUser(token: string, res: Res) {
    const decodedPayload = await this.decodeToken(token);

    const currentUser = await this.prisma.user.findUnique({
      where: {
        id: (decodedPayload as {[key: string]: any}).id
      },
      select: {
        badgeColor: true,
        email: true,
        id: true,
        role: true,
        userName: true
      }
    });

    return res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' }).json({
      message: 'Game is successfully created',
      data: currentUser
    });
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: {
        badgeColor: true,
        email: true,
        id: true,
        role: true,
        userName: true
      }
    });
    return { data: user };
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        badgeColor: true,
        email: true,
        id: true,
        role: true,
        userName: true
      }
    });
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
    const updatedUser = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        role: updUserDto.role
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

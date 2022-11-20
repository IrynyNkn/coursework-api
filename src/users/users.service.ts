import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {Request} from "express";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({where: {id}});
    return { user };
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }
}

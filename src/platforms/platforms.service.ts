import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {Request} from "express";
import {PlatformDto} from './dto/platform.dto';

@Injectable()
export class PlatformsService {
  constructor(private prisma: PrismaService) {}

  async createPlatform(dto: PlatformDto) {
    const { name } = dto;
    const platform = await this.prisma.platform.create({
      data: {
        name
      }
    });

    return {
      message: 'Platform is successfully created',
      data: {
        id: platform.id
      }
    };
  }

  async getPlatform(id: string) {
    const platform = await this.prisma.platform.findUnique({where: {id}});
    return { data: platform };
  }

  async getPlatforms() {
    return await this.prisma.platform.findMany();
  }
}

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

  async updatePlatform(id: string, dto: PlatformDto) {
    const updatedPlt = await this.prisma.platform.update({
      where: {
        id
      },
      data: {
        name: dto.name
      }
    });

    return {
      message: 'Platform is successfully updated',
      data: {
        id: updatedPlt.id
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

  async deletePlatform(id: string) {
    await this.prisma.platform.delete({
      where: {id}
    });

    return { message: 'Platform is successfully deleted' };
  }
}

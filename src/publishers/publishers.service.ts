import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {PublisherDto} from "./dto/publisher.dto";

@Injectable()
export class PublishersService {
  constructor(private prisma: PrismaService) {}

  async createPublisher(dto: PublisherDto) {
    const { name } = dto;
    const publisher = await this.prisma.publisher.create({
      data: {
        name
      }
    });

    return {
      message: 'Publisher is successfully created',
      data: {
        id: publisher.id
      }
    };
  }

  async updatePublisher(id: string, dto: PublisherDto) {
    const updatedPublisher = await this.prisma.publisher.update({
      where: {
        id
      },
      data: {
        name: dto.name
      }
    });

    return {
      message: 'Publisher is successfully updated',
      data: {
        id: updatedPublisher.id
      }
    };
  }

  async getPublisher(id: string) {
    const publisher = await this.prisma.publisher.findUnique({where: {id}});
    return { data: publisher };
  }

  async getPublishers() {
    return await this.prisma.publisher.findMany();
  }

  async deletePublisher(id: string) {
    await this.prisma.publisher.delete({
      where: {id}
    });

    return { message: 'Publisher is successfully deleted' };
  }
}

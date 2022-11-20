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
  };

  async getPublisher(id: string) {
    const publisher = await this.prisma.publisher.findUnique({where: {id}});
    return { data: publisher };
  }

  async getPublishers() {
    return await this.prisma.publisher.findMany();
  }
}

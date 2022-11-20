import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import {PublisherDto} from "./dto/publisher.dto";

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  createPublisher(@Body() dto: PublisherDto) {
    return this.publishersService.createPublisher(dto);
  }

  @Get()
  getPublishers() {
    return this.publishersService.getPublishers();
  }

  @Get(':id')
  getPublisherById(@Param() params: {id: string}) {
    return this.publishersService.getPublisher(params.id);
  }
}

import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import {PublisherDto} from "./dto/publisher.dto";
import {JwtAuthGuard} from "../auth/jwt.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Roles('admin', 'manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createPublisher(@Body() dto: PublisherDto) {
    return this.publishersService.createPublisher(dto);
  }

  @Roles('admin', 'manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  updatePublisher(@Param() params: {id: string}, @Body() dto: PublisherDto) {
    return this.publishersService.updatePublisher(params.id, dto);
  }

  @Get()
  getPublishers() {
    return this.publishersService.getPublishers();
  }

  @Get(':id')
  getPublisherById(@Param() params: {id: string}) {
    return this.publishersService.getPublisher(params.id);
  }

  @Roles('admin', 'manager')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deletePublisher(@Param() params: {id: string}) {
    return this.publishersService.deletePublisher(params.id);
  }
}

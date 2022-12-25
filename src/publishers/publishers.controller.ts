import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import {PublisherDto} from "./dto/publisher.dto";
import {JwtAuthGuard} from "../auth/jwt.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";

@Controller('publishers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Roles('admin', 'manager')
  @Post()
  createPublisher(@Body() dto: PublisherDto) {
    return this.publishersService.createPublisher(dto);
  }

  @Roles('admin', 'manager')
  @Patch(':id')
  updatePublisher(@Param() params: {id: string}, @Body() dto: PublisherDto) {
    return this.publishersService.updatePublisher(params.id, dto);
  }

  @Roles('admin', 'manager')
  @Get()
  getPublishers() {
    return this.publishersService.getPublishers();
  }

  @Roles('admin', 'manager')
  @Get(':id')
  getPublisherById(@Param() params: {id: string}) {
    return this.publishersService.getPublisher(params.id);
  }

  @Roles('admin', 'manager')
  @Delete(':id')
  deletePublisher(@Param() params: {id: string}) {
    return this.publishersService.deletePublisher(params.id);
  }
}

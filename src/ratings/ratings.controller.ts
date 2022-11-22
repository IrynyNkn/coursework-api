import {Body, Controller, Post} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import {RatingDto} from "./dto/rating.dto";

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  rateGame(@Body() dto: RatingDto) {
    return this.ratingsService.rateGame(dto);
  }
}

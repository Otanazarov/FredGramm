import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('hashtag')
@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  create(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.create(createHashtagDto);
  }
}

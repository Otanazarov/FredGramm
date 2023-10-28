import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindAllCreatDto } from './dto/findAll-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  
  @Get('search/:query')
  search(@Param('query') query){
    return this.postService.search(query)
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query() findAllPostDto:FindAllCreatDto) {
    console.log(findAllPostDto);
    return this.postService.findAll(findAllPostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}

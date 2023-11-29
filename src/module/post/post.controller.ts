import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindAllCreatDto } from './dto/findAll-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RequestWithID } from 'src/common/interface/Request.type';
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('search/:query')
  search(@Param('query') query) {
    return this.postService.search(query);
  }

  @Get('hashtag/:query')
  hashtagSearch(@Param('query') query) {
    return this.postService.hashtagSearch(query);
  }

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: RequestWithID) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query() findAllPostDto: FindAllCreatDto) {
    console.log(findAllPostDto);
    return this.postService.findAll(findAllPostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: RequestWithID,
  ) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithID) {
    return this.postService.remove(+id,req);
  }
}

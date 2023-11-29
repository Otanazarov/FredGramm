import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindAllCreatDto } from './dto/findAll-comment';
import { RequestWithID } from 'src/common/interface/Request.type';
@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto,@Req() req:RequestWithID) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() findAllcommentDto:FindAllCreatDto) {
    return this.commentService.findAll(findAllcommentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto,@Req() req:RequestWithID) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req() req:RequestWithID) {
    return this.commentService.remove(+id);
  }
}

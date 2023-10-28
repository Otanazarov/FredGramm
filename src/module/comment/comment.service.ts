import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Post } from '../post/entities/post.entity';
import { FindAllCreatDto } from './dto/findAll-comment';
import { Pagination } from 'src/common/util/pagination';
import { ApiResponse } from 'src/common/http/ApiRespone';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    try {
      const { post_id, user_id } = createCommentDto;
    const user = await this.userRepo.findOneBy({ id: user_id });
    const post = await this.postRepo.findOneBy({ id: post_id });
    if (!user) {
      throw new BadRequestException(`user_id ${user_id} not found`);
    }
    if (!post) {
      throw new BadRequestException(`post_id ${post_id} not found`);
    }

    const result = await this.commentRepo.create(createCommentDto);
    result.post = post;
    result.user = user;
    await this.commentRepo.save(result);
    return 'succees'
    } catch (error) {
      throw error
    }
    ;
  }

  async findAll(findAllcommentDto: FindAllCreatDto) {
    try {
      const totalPageCount = await this.commentRepo.count();
    const { page, limit } = findAllcommentDto;
    const pagination = new Pagination(limit, page, totalPageCount);
    const posts = await this.commentRepo.find({
      take: pagination.limit,
      skip: pagination.offset,
      relations: ['user', 'post'],
      loadRelationIds: true,
    });
    return new ApiResponse(posts, pagination);
    } catch (error) {
      throw error
    }
    
  }

  async findOne(id: number) {
    const comment = await this.commentRepo.findOneBy({ id });
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.commentRepo.findOneBy({id})
      if(!comment){
        throw new NotFoundException(
          `comment with id ${comment} not found`
        )
      }
      const {text } = updateCommentDto;
    await this.commentRepo.update({ id }, {text});
    } catch (error) {
      throw error
    }
    
  }

  async remove(id: number) {
    await this.commentRepo.delete({id}) 
  }
}

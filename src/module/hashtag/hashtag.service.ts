import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { Repository } from 'typeorm';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(Hashtag) private readonly hashtagRepo: Repository<Hashtag>
  ){}
  async create(createHashtagDto: CreateHashtagDto) {
    const {name} = createHashtagDto 
    const verifySign = await this.hashtagRepo.findOneBy({name})
    if(verifySign){
      throw new NotFoundException(`
      name ${name} not found`)
    }
    const result = await this.hashtagRepo.create(createHashtagDto)
    await this.hashtagRepo.save(result)
  }

  findAll() {
    return `This action returns all hashtag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hashtag`;
  }

  update(id: number, updateHashtagDto: UpdateHashtagDto) {
    return `This action updates a #${id} hashtag`;
  }

  remove(id: number) {
    return `This action removes a #${id} hashtag`;
  }
}

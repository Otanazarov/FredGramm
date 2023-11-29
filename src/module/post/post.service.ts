import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Like, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FindAllCreatDto } from './dto/findAll-post.dto';
import { Pagination } from 'src/common/util/pagination';
import { ApiResponse } from 'src/common/http/ApiRespone';
import { Hashtag } from '../hashtag/entities/hashtag.entity';
import { RequestWithID } from 'src/common/interface/Request.type';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Hashtag)
    private readonly hashtagRepo: Repository<Hashtag>,
  ) {}
  async search(query) {
    return new ApiResponse(
      await this.postRepo.find({
        where: {
          title: Like(`%${query}%`),
        },
      }),
    );
  }

  async hashtagSearch(query) {
    return new ApiResponse(
      (
        await this.hashtagRepo.findOne({
          where: {
            name: Like(`%${query}%`),
          },
          loadEagerRelations: true,
          relations: ['posts'],
        })
      ).posts,
    );
  }

  async create(createPostDto: CreatePostDto) {
    try {
      const { desc, media, title, users, hashtag } = createPostDto;
      const arrayOFUserObject = [];

      for (const id of users) {
        const user = await this.userRepo.findOneBy({ id });

        if (!user) {
          throw new NotFoundException(`user with ${id} not found`);
        }
        arrayOFUserObject.push(user);
      }
      const arrayOFhashtagObject = [];

      for (const name of hashtag) {
        const hashtag_ = await this.hashtagRepo.findOneBy({ name });
        if (!hashtag_) {
          throw new NotFoundException(`hashteg with ${name} not found`);
        }

        arrayOFhashtagObject.push(hashtag_);
        console.log(arrayOFhashtagObject);
      }
      const post = this.postRepo.create({
        desc,
        media,
        title,
        users: arrayOFUserObject,
        hashtags: arrayOFhashtagObject,
      });

      await this.postRepo.save(post);
      return;
    } catch (error) {
      throw error;
    }
  }

  async findAll(findAllCreatDto: FindAllCreatDto) {
    try {
      console.log(findAllCreatDto);

      const totalPageCount = await this.postRepo.count();
      const { page, limit } = findAllCreatDto;
      const pagination = new Pagination(limit, page, totalPageCount);
      const posts = await this.postRepo.find({
        take: pagination.limit,
        skip: pagination.offset,
        relations: ['users'],
        loadRelationIds: true,
      });
      return new ApiResponse(posts, pagination);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    const result = await this.postRepo.findOneBy({ id });
    const post = await this.postRepo.find({ relations: ['users'], where: { id: id } });
    let view_count = result.view_count;
    if (result) {
      view_count += 1;
    }
    await this.postRepo.update({ id }, { view_count });
    return {user:result,relation:post}
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const { desc, title } = updatePostDto;
      const post = await this.postRepo.findOneBy({ id });
      if (!post) {
        throw new BadRequestException(`ID not found`);
      }
      const updaePost = await this.postRepo.update({ id }, { desc, title });
      return 'succes';
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, req: RequestWithID) {
    const post = await this.postRepo.findOneBy({
      id: id,
      users: { id: req.userID },
    });

    if (!post) {
      throw new NotFoundException('post not found');
    }

    await this.postRepo.remove(post);

    return new ApiResponse(true);
  }
}


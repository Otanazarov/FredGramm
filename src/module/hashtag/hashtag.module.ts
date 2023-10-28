import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { Post } from '../post/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Hashtag,Post])],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}

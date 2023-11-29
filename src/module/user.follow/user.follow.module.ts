import { Module } from '@nestjs/common';
import { UserFollowService } from './user.follow.service';
import { UserFollowController } from './user.follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserFollow } from './entities/user.follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserFollow,User])],
  controllers: [UserFollowController],
  providers: [UserFollowService],
})
export class UserFollowModule {}

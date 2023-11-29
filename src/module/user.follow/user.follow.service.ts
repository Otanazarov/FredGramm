import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserFollowDto } from './dto/create-user.follow.dto';
import { UpdateUserFollowDto } from './dto/update-user.follow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserFollow } from './entities/user.follow.entity';
import { ApiResponse } from 'src/common/http/ApiRespone';

@Injectable()
export class UserFollowService {
  constructor(
    @InjectRepository(UserFollow)
    private readonly userFollowRepo: Repository<UserFollow>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserFollowDto: CreateUserFollowDto) {
    const { followingUser, user } = createUserFollowDto;
    const searchUser = await this.userRepo.findOneBy({ id: user });
    const searchFollowUser = await this.userRepo.findOneBy({
      id: followingUser,
    });
    const relationsFollow = await this.userFollowRepo.findOne({
      where: { followingUser: { id: followingUser }, User: { id: user } },
      relations: ['User', 'followingUser'],
    });
    if (relationsFollow) {
      throw new NotFoundException('alrady have user');
    }

    if (!searchFollowUser || !searchUser) {
      throw new BadGatewayException(`
       followerID or userid not found`);
    }
    const result = this.userFollowRepo.create({
      User: searchUser,
      followingUser: searchFollowUser,
    });
    await this.userFollowRepo.save(result);
  }

  findAll() {
    return `This action returns all userFollow`;
  }

  async followers(userID) {
    const user = await this.userRepo.findOneBy({ id: userID });

    if (!user) {
      throw new NotFoundException(`user with id ${userID} not found`);
    }

    const follows = await this.userFollowRepo.find({
      relations: ['followingUser', 'User'],
      where: { User: { id: userID } },
    });

    const followingUsers = [];

    for (let i in follows) {
      const { created_at, email, firstname, id, lastname, role, uptated_at } =
        follows[i].User;

      followingUsers.push({
        id,
        firstname,
        lastname,
        email,
        role,
        created_at,
        uptated_at,
      });
    }
    return new ApiResponse(followingUsers);
  }
  async following(userID) {
    const user = await this.userRepo.findOneBy({ id: userID });

    if (!user) {
      throw new NotFoundException(`user with id ${userID} not found`);
    }

    const follows = await this.userFollowRepo.find({
      relations: ['followingUser', 'User'],
      where: { followingUser: { id: userID } },
    });

    const followingUsers = [];

    for (let i in follows) {
      const { created_at, email, firstname, id, lastname, role, uptated_at } =
        follows[i].User;

      followingUsers.push({
        id,
        firstname,
        lastname,
        email,
        role,
        created_at,
        uptated_at,
      });
    }
    return new ApiResponse(followingUsers);
  }

  update(id: number, updateUserFollowDto: UpdateUserFollowDto) {
    return `This action updates a #${id} userFollow`;
  }

  remove(id: number) {
    return `This action removes a #${id} userFollow`;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { encrypWithAES } from 'src/common/util/hashing.util';
import { ApiResponse } from 'src/common/http/ApiRespone';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async search(query) {
    return new ApiResponse(
      await this.userRepo.find({
        where: {
          firstname: Like(`%${query}%`),
        },
      }),
    );
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = encrypWithAES(createUserDto.password);
    const user = this.userRepo.create(createUserDto);
    this.userRepo.save(user);
    return 'succes';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOneBy({ id: id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException(`ID not found`);
    }
    if (updateUserDto.email) {
      const user = await this.userRepo.exist({
        where: { email: updateUserDto.email },
      });
      if (user) {
        throw new BadRequestException(
          `user with email ${updateUserDto.email} already exists`,
        );
      }
    }
    const updateUser = await this.userRepo.update({ id }, updateUserDto);
    return 'succes';
  }

  async remove(id: number) {
    try {
      const user = await this.userRepo.findOneBy({ id });
      console.log(user);

      if (!user) {
        throw new NotFoundException(`User with id :${id} not found`);
      }
      await this.userRepo.remove(user);
      return 'Ochrildi';
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

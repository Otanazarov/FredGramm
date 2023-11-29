import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthLoginDto } from './dto/create_login.dto';
import { RolesGuard } from 'src/common/guards/role.guard';
import { decryptWithAES, encrypWithAES } from 'src/common/util/hashing.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { email, password, firstname, lastname } = createAuthDto;
    const hashed_password_hash = await encrypWithAES(password)
    
    const user = this.UserRepo.create({
      firstname,
      email,
      password: hashed_password_hash,
      lastname,
    });
    if (createAuthDto.email) {
      const verify = await this.UserRepo.exist({
        where: { email: createAuthDto.email },
      });
      if (verify) {
        throw new BadRequestException(`Already have an email`);
      }
    }
    this.UserRepo.save(user);
    return user;
  }
  async login(createAuthLoginDto: CreateAuthLoginDto) {
    const { email, password } = createAuthLoginDto;
    const user = await this.UserRepo.findOneBy({ email });
    if (!user) {
      throw new BadRequestException(`Email not found`);
    }
 
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException(`Wrong password`);
    }
    const jwt = await this.jwtService.signAsync({ id: user.id,role:user.role });
    return jwt;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

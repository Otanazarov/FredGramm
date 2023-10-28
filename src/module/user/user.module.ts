import { Module, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { typeoremConfig } from 'src/common/config/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

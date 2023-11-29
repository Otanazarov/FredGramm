import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeoremConfig } from './common/config/typeorm-config';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { PostModule } from './module/post/post.module';
import { CommentModule } from './module/comment/comment.module';
import { HashtagModule } from './module/hashtag/hashtag.module';
import { UserFollowModule } from './module/user.follow/user.follow.module';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeoremConfig),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    HashtagModule,
    UserFollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

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

@Module({
  imports: [TypeOrmModule.forRoot(typeoremConfig), AuthModule, UserModule, PostModule, CommentModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

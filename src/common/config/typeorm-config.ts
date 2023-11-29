import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { env } from './env.config';
import { Auth } from 'src/module/auth/entities/auth.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Post } from 'src/module/post/entities/post.entity';
import { Comment } from 'src/module/comment/entities/comment.entity';
import { Hashtag } from 'src/module/hashtag/entities/hashtag.entity';
import { UserFollow } from 'src/module/user.follow/entities/user.follow.entity';

export const typeoremConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  entities: [User, Post, Comment, Hashtag, UserFollow],
  synchronize: true,
};

import { RootEntity } from 'src/common/entity/root.entity';
import { Post } from 'src/module/post/entities/post.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
@Entity()
export class Comment extends RootEntity {
  @ManyToOne((comment) => Post)
  post: Post;

  @ManyToOne((comment) => User)
  user: User;
  @Column()
  text: string;
}

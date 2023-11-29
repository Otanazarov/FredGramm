import { RootEntity } from 'src/common/entity/root.entity';
import { Post } from 'src/module/post/entities/post.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
@Entity()
export class Hashtag extends RootEntity {
  
  @Column()
  name: string;

  @ManyToMany(() => Post, (post) => post.hashtags)
  @JoinTable()
  posts: Post[];
}

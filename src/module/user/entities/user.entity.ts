import { RootEntity } from 'src/common/entity/root.entity';
import { UserRole } from 'src/common/enum/user.role';
import { Post } from 'src/module/post/entities/post.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class User extends RootEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ enum: UserRole, type: 'enum', default: UserRole.USER })
  role: UserRole;

  @Column()
  password: string;

  @Column({ default: false })
  refresh_token: string;

  @ManyToMany(() => Post, (post) => post.users, { cascade: true })
  @JoinTable()
  posts: Post[];
}

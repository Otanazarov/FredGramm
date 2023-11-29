import { RootEntity } from 'src/common/entity/root.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne } from 'typeorm';
@Entity()
export class UserFollow extends RootEntity {
  @ManyToOne(() => User,(user)=>user.id)
  @JoinTable()
  followingUser: User;

  @ManyToOne(() => User,(user)=>user.id)
  @JoinTable()
  User: User;
}

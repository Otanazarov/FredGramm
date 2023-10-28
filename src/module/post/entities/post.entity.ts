import { RootEntity } from "src/common/entity/root.entity";
import { Hashtag } from "src/module/hashtag/entities/hashtag.entity";
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Post  extends RootEntity{
    @Column()
    title:string

    @Column({nullable:true})
    media:string

    @Column()
    desc:string

    @Column()
    view_count:number

   @ManyToMany(()=>User,(user)=> user.posts)
   users:User[]

   @ManyToMany(()=>Hashtag,(hashtag)=> hashtag.posts)
   hashtags:Hashtag[]
   
}

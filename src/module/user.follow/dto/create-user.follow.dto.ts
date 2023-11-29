import { IsInt, isInstance, isInt, isNumber } from "class-validator";

export class CreateUserFollowDto {
    @IsInt()
    followingUser: number  
    @IsInt()
    user:number
}

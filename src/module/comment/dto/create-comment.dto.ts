import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty()
    @IsNumber()
    post_id:number

    @ApiProperty()
    @IsNumber()
    user_id:number

    @ApiProperty()
    @IsString()
    text:string

    
}

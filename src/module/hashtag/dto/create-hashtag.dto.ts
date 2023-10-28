import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateHashtagDto {
    @ApiProperty()
    @IsString()
    name:string

}

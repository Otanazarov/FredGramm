import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, IsString } from "class-validator"

export class FindAllCreatDto{
    @IsInt()
    @IsOptional()
    @Type( () => Number)
    page:number
    
    @IsInt()
    @IsOptional()
    @Type( () => Number)
    limit:number
}
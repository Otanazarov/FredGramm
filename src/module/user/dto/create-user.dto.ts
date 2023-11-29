import {IsEmail, IsEnum, IsNotEmpty, IsString, IsNumber, IsOptional} from "class-validator"
import { UserRole } from "src/common/enum/user.role"


export class CreateUserDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    firstname:string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    lastname:string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsString()
    @IsOptional()
    @IsEnum(UserRole)
    @IsNotEmpty()
    role:UserRole

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    password:string



}

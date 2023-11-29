import { IsEmail,IsNotEmpty,IsOptional,IsString } from "class-validator";

export class CreateAuthLoginDto {
    @IsNotEmpty()
    @IsString()
    password:string

    @IsEmail()
    @IsString()
    email:string
}
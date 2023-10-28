import { IsEmail,IsNotEmpty,IsOptional,IsString } from "class-validator";

export class CreateAuthDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password:string

    @IsEmail()
    @IsString()
    email:string

    @IsString()
    firstname:string

    @IsString()
    lastname:string
}

import { IsEmail, IsNotEmpty, IsString } from "class-validator";
//DTO means Data Transer Object 

export class CreateUserDto{
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsString()
    password : string

}
import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../auth/entities/role.entity";
import { RoleId } from "../../auth/enums/role.enum";
//DTO means Data Transer Object 

export class CreateUserDto{
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsString()
    password : string

   
    @IsEnum(RoleId)
    @IsNotEmpty()
    type : string

}
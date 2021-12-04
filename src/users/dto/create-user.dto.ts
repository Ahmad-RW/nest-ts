import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleId } from '../../auth/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(RoleId)
  @IsNotEmpty()
  type: string;
}

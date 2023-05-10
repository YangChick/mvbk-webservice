import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;

  @IsString()
  username: string;

  @IsString()
  roleCode?: string;

  birth?: string;

  gender?: string;

  phoneNumber?: string;
}
export class UpdateUserDto {
  @IsString()
  birth?: string;

  @IsString()
  gender?: string;

  @IsString()
  phoneNumber?: string;
}

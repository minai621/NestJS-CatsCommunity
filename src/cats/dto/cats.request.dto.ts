import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  catName: string;
}

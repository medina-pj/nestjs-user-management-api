import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

class UpdateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  address: string;

  @IsNumber()
  postal_code: number;

  @IsEmail()
  email: string;

  @IsNumber()
  contact_number: number;
}

export { UpdateUserDto };

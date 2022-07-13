import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

class UserDto {
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

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Username must be atleast 6 characters.',
  })
  @MaxLength(19, {
    message: 'Password must be less than 20 characters.',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be atleast 6 characters.',
  })
  @MaxLength(31, {
    message: 'Password must be less than 32 characters.',
  })
  password: string;
}

export { UserDto };

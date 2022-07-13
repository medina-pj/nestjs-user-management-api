import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

class UpdateUserPasswordDto {
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be atleast 6 characters.',
  })
  @MaxLength(31, {
    message: 'Password must be less than 32 characters.',
  })
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be atleast 6 characters.',
  })
  @MaxLength(31, {
    message: 'Password must be less than 32 characters.',
  })
  newPassword: string;
}

export { UpdateUserPasswordDto };

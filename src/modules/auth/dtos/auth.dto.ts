import { IsNotEmpty } from 'class-validator';

class AuthCredentialsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export { AuthCredentialsDto };

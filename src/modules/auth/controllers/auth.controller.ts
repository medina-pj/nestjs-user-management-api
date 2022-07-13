import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthCredentialsDto } from '../dtos';
import { AuthService } from '../services/auth.service';
import { UserEntity } from '../../users/entities';
import { GetUserDecorator } from '../../../decorators/get-user.decorator';
import { SignInDocDecorator, ValidateDocDecorator } from '../swagger';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @SignInDocDecorator()
  async signIn(
    @Body() credentials: AuthCredentialsDto,
  ): Promise<{ user: UserEntity; accessToken: string }> {
    return await this.authService.signIn(credentials);
  }

  @Get('/validate')
  @ValidateDocDecorator()
  @UseGuards(AuthGuard())
  validate(@GetUserDecorator() user: UserEntity): UserEntity {
    return user;
  }
}

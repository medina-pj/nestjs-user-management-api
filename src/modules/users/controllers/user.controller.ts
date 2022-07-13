import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { GetUserDecorator } from '../../../decorators/get-user.decorator';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities';
import {
  GetUserFilterDto,
  UpdateUserDto,
  UserDto,
  UpdateUserPasswordDto,
} from '../dtos';
import {
  CreateUserDocDecorator,
  UpdateUserDocDecorator,
  GetUserDocDecorator,
  GetManyUserDocDecorator,
  DeletUserDocDecorator,
  DeletManyUserDocDecorator,
  UpdateUserPassswordDocDecorator,
} from '../swagger';

@Controller('users')
@ApiTags('User')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CreateUserDocDecorator()
  async createUser(@Body() userDto: UserDto): Promise<UserEntity> {
    const res = await this.userService.createUser(userDto);

    return res;
  }

  @Get(':id')
  @GetUserDocDecorator()
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const res = await this.userService.getUser(id);
    return res;
  }

  @Get()
  @GetManyUserDocDecorator()
  async getUsers(
    @GetUserDecorator() user: UserEntity,
    @Query() filterDto: GetUserFilterDto,
  ): Promise<UserEntity[]> {
    let res = [];

    if (Object.keys(filterDto).length) {
      res = await this.userService.getUsers(user, filterDto);
    } else {
      res = await this.userService.getUsers(user);
    }

    return res;
  }

  @Delete('multiple')
  @DeletManyUserDocDecorator()
  async deleteUsers(@Query('id') id: number[]): Promise<void> {
    const res = await this.userService.deleteMultipleUser(id);
    return res;
  }

  @Delete(':id')
  @DeletUserDocDecorator()
  async deleteUser(@Param('id') id: number): Promise<void> {
    const res = await this.userService.deleteUser(id);
    return res;
  }

  @Patch('password/:id')
  @UpdateUserPassswordDocDecorator()
  async updateUserPassword(
    @Param('id') id: number,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<void> {
    await this.userService.updateUserPassword(id, updateUserPasswordDto);
    return;
  }

  @Patch(':id')
  @UpdateUserDocDecorator()
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const res = await this.userService.updateUser(id, updateUserDto);
    return res;
  }
}

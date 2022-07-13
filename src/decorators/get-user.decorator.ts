import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../modules/users/entities';

export const GetUserDecorator = createParamDecorator(
  (_data, context: ExecutionContext): UserEntity => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);

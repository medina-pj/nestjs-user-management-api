import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

export function SignInDocDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Sign in user.',
    }),
    ApiBody({
      schema: {
        example: {
          username: 'user_001',
          password: 'user123123',
        },
      },
    }),
  );
}

export function ValidateDocDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Validate authentication token.',
    }),
    ApiBearerAuth(),
  );
}

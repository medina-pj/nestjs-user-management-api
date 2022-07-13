import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

export function CreateUserDocDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user.',
    }),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        example: {
          first_name: 'Jane',
          last_name: 'Doe',
          address: 'Makati',
          postal_code: 1200,
          contact_number: 9178884444,
          email: 'jane_doe@email.com',
          username: 'jane_doe',
          password: 'userJaneDoe',
        },
      },
    }),
  );
}

export function UpdateUserDocDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user.',
    }),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        example: {
          first_name: 'Jane',
          last_name: 'Doe',
          address: 'Makati',
          postal_code: 1200,
          contact_number: 9176665555,
          email: 'user_01@email.com',
        },
      },
    }),
  );
}

export function UpdateUserPassswordDocDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user password.',
    }),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        example: {
          oldPassword: '',
          newPassword: '',
        },
      },
    }),
  );
}

export function DeletUserDocDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a single user.',
    }),
    ApiBearerAuth(),
  );
}

export function DeletManyUserDocDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a multiple user.',
    }),
    ApiBearerAuth(),
  );
}

export function GetUserDocDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a single user.',
    }),
    ApiBearerAuth(),
  );
}

export function GetManyUserDocDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get users.',
    }),
    ApiBearerAuth(),
  );
}

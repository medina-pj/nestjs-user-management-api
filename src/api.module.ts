import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule],
})
export class ApiModule {}

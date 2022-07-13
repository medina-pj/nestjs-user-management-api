// npm package
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// modules
import { AuthModule } from '../auth/auth.module';

// entities
import { UserEntity } from './entities';

// providers
import { UserService } from './services';
import { UserController } from './controllers';
import { CryptoService } from '../../providers/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserService, CryptoService],
  controllers: [UserController],
})
export class UsersModule {}

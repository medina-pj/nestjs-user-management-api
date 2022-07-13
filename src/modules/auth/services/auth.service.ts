import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { AuthCredentialsDto } from '../dtos';
import { UserEntity } from '../../users/entities';
import { JwtPayload } from '../interfaces';
import { CryptoService } from '../../../providers/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async signIn(
    credentials: AuthCredentialsDto,
  ): Promise<{ user: UserEntity; accessToken: string }> {
    // check username exist
    const checkUsername = await this.userRepo.findOneBy({
      username: credentials.username,
    });

    if (!checkUsername) throw new UnauthorizedException('Invalid username.');

    // check password
    const checkPassword = await this.cryptoService.comparePassword(
      credentials.password,
      checkUsername.password,
    );

    if (!checkPassword) throw new UnauthorizedException('Invalid password.');

    const payload: JwtPayload = { username: credentials.username };
    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken, user: checkUsername };
  }
}

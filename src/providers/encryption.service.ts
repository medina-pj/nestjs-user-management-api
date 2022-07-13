import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
class CryptoService {
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  }

  public async comparePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<string> {
    const result = await bcrypt.compare(password, encryptedPassword);
    return result;
  }
}

export { CryptoService };

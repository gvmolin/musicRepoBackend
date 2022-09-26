import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersInterface } from '../users/users.interface';
import * as hashSystem from '../../../core/utils/hash.utils';

@Injectable()
export class AuthService {
  constructor(private readonly usersInterface: UsersInterface) {}
  async authenticate(authDto: AuthDto) {
    const user = await this.usersInterface.findUser({
      username: authDto.username,
    });
    if (user) {
      const valid = await hashSystem.validateHash(
        authDto.password,
        user.password,
      );
      if (valid) {
        //
      }
    }
  }
}

import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersInterface } from '../users/users.interface';
import { User } from '../users/entities/user.entity';
import * as hashSystem from '../../../core/utils/hash.utils';
import RefreshToken from './entities/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private refreshTokens: RefreshToken[] = [];
  constructor(private readonly usersInterface: UsersInterface) {}
  async authenticate(
    authDto: AuthDto,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.usersInterface.findUser({
      username: authDto.username,
    });
    if (!user) {
      return undefined;
    }
    const valid = await hashSystem.validateHash(
      authDto.password,
      user.password,
    );

    if (valid) {
      return this.newRefreshAndAccessToken(user, values);
    } else {
      return undefined;
    }
  }

  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.id,
    });
    this.refreshTokens.push(refreshObject);

    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: user.id,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1h',
        },
      ),
    };
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return;
    }
    // delete refreshtoken from db
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== refreshToken.id,
    );
    console.log(this.refreshTokens);
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }

    const user = await this.usersInterface.findUser(refreshToken.userId);
    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.userId,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.ACCESS_SECRET);
      // console.log('decoded', decoded)
      if (typeof decoded === 'string') {
        console.log('string');
        return undefined;
      }
      return Promise.resolve(
        this.refreshTokens.find((token) => token.id === decoded.id),
      );
    } catch (e) {
      return undefined;
    }
  }
}

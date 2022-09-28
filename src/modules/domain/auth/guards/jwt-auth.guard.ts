import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid JWT');
    }
    console.log(
      `>>> LOG ------> METHOD '${context.args[1].req.method}' '------> USER '${user.userId}'`,
      `------> PATH '${context.args[1].req.path}'`,
    );
    return super.handleRequest(err, user, info, context, status);
  }
}

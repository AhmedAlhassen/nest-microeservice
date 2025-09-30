import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UserDocumnet } from './users/models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocumnet, response: Response) {
    const tokenPayload: TokenPayload = { userId: user._id.toHexString() };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        (this.configService.get<number>('JWT_EXPIRTION') ?? 0),
    );

    const token = await this.jwtService.signAsync(tokenPayload);
    console.log('tokenFrom', token);
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}

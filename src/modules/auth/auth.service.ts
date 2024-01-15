import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(phoneNumber: string, pass: string) {
    const user = await this.userService.findOneByNumber(phoneNumber);

    if (!user) {
      throw new UnauthorizedException('Бүртгэлгүй хэрэглэгч');
    }
    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) {
      throw new UnauthorizedException('Нууц үг буруу');
    }

    const payload = { sub: user.id, phoneNumber };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      }),
    };
  }
}

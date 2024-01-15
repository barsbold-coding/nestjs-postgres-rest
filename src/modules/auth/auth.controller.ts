import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() credential: AuthDto) {
    return await this.authService.signIn(
      credential.phoneNumber,
      credential.password,
    );
  }
}

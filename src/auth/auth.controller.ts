import {Body, Controller, Get, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto, SingInDto} from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SingInDto) {
    return this.authService.signin(dto);
  }

  @Get('signout')
  signout() {
    return this.authService.signout()
  }
}

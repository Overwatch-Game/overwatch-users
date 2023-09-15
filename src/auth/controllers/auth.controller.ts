import { Body, Post, Controller } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { AuthSignupDto, AuthSigninDto } from '../dtos';
import { Public } from '../decorators/public-routes.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signIn(@Body() user: AuthSigninDto) {
    return this.authService.signIn(user);
  }

  @Public()
  @Post('signup')
  signUp(@Body() user: AuthSignupDto) {
    return this.authService.signUp(user);
  }
}

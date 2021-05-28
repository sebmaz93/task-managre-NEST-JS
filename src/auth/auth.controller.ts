import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredDto } from './dto/auth-cred.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredDto: AuthCredDto): Promise<void> {
    return this.authService.signUp(authCredDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredDto: AuthCredDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredDto);
  }
}

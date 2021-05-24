import { User } from '@prisma/client';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredDto } from './dto/auth-cred.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredDto: AuthCredDto): Promise<User> {
    return this.authService.signUp(authCredDto);
  }
}

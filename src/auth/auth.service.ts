import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.intereface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signUp(data: Prisma.UserCreateInput): Promise<void> {
    try {
      const salt = await bcrypt.genSalt();
      const password = await this.hashPassword(data.password, salt);

      await this.prisma.user.create({
        data: { username: data.username, password, salt },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ConflictException('username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn({
    username,
    password,
  }: Prisma.UserCreateInput): Promise<{ accessToken: string }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { username };
        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new UnauthorizedException('please check your credentials');
    }
  }
}

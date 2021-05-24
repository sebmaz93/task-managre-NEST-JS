import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

  async signIn(data: Prisma.UserCreateInput): Promise<string> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: data.username,
        },
      });
      if (user && (await bcrypt.compare(data.password, user.password))) {
        return 'success';
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new UnauthorizedException('please check your credentials');
    }
  }
}

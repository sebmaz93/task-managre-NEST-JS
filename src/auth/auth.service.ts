import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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

  async signUp(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const password = await this.hashPassword(data.password, salt);

      return await this.prisma.user.create({
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
}

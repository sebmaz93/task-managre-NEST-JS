import { Module } from '@nestjs/common';
import { TasksModule } from 'tasks/tasks.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
    }),
    TasksModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}

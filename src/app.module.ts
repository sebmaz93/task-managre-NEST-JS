import { Module } from '@nestjs/common';
import { TasksModule } from 'tasks/tasks.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from 'config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}

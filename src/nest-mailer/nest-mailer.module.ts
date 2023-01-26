import { Module } from '@nestjs/common';
import { NestMailerService } from './nest-mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import config from './nest-mailer.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          imports: [ConfigModule],
          inject: [ConfigService],
          ...config(),
        };
      },
    }),
  ],
  exports: [NestMailerService],
  providers: [NestMailerService],
})
export class NestMailerModule {}

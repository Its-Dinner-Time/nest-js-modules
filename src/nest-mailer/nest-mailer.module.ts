import { Module } from '@nestjs/common';
import { NestMailerService } from './nest-mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import setConfiguration from './nest-mailer.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/nest-mailer/nest-mailer.env',
      expandVariables: true,
    }), //
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => setConfiguration(config),
    }),
  ],
  exports: [MailerModule, NestMailerService],
  providers: [NestMailerService],
})
export class NestMailerModule {}

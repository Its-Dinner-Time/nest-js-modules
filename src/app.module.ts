import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestMailerModule } from './nest-mailer/nest-mailer.module';
import { NestUrlGeneratorModule } from './nest-url-generator/nest-url-generator.module';
import { UtilDateProvider } from './util-date/util-date.provider';

@Module({
  imports: [NestMailerModule, NestUrlGeneratorModule],
  controllers: [AppController],
  providers: [AppService, UtilDateProvider],
})
export class AppModule {}

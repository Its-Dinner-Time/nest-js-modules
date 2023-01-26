import { Module } from '@nestjs/common';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { NestUrlGeneratorService } from './nest-url-generator.service';
import config from './nest-url-generator.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UrlGeneratorModule.forRootAsync({
      useFactory: () => {
        return {
          imports: [ConfigModule],
          inject: [ConfigService],
          ...config(),
        };
      },
    }),
  ],
  exports: [NestUrlGeneratorService],
  providers: [NestUrlGeneratorService],
})
export class NestUrlGeneratorModule {}

import { Module } from '@nestjs/common';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { NestUrlGeneratorService } from './nest-url-generator.service';
import setConfiguration from './nest-url-generator.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/nest-url-generator/nest-url-generator.env',
      expandVariables: true,
    }), //
    UrlGeneratorModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => setConfiguration(config),
    }),
  ],
  exports: [NestUrlGeneratorService],
  providers: [NestUrlGeneratorService],
})
export class NestUrlGeneratorModule {}

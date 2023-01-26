import { Injectable } from '@nestjs/common';
import { UrlGeneratorService } from 'nestjs-url-generator/dist/url-generator.service';
import { TGenerateSignedControllerUrlReturn } from './nest-url-generator.types';
import { SignControllerUrlArgs } from 'nestjs-url-generator/dist/interfaces';

@Injectable()
export class NestUrlGeneratorService {
  constructor(private readonly urlGeneratorService: UrlGeneratorService) {}

  generateSignedControllerUrl(
    option: SignControllerUrlArgs,
  ): TGenerateSignedControllerUrlReturn {
    const url = this.urlGeneratorService.signControllerUrl(option);
    const signed = url.split('signed=').at(-1);

    return {
      url,
      expirationDate: option.expirationDate,
      signed,
    };
  }
}

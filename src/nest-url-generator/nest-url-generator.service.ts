import { Injectable } from '@nestjs/common';
import {
  UrlGeneratorService,
  SignControllerUrlArgs,
} from 'nestjs-url-generator';
import { TGenerateSignedControllerUrlReturn } from './nest-url-generator.types';

@Injectable()
export class NestUrlGeneratorService {
  constructor(private readonly urlGeneratorService: UrlGeneratorService) {}

  generateSignedControllerUrl(
    option: SignControllerUrlArgs,
  ): TGenerateSignedControllerUrlReturn {
    const url = this.urlGeneratorService.signControllerUrl(option);
    const signed = url.split('signed=').slice(-1)[0];

    return {
      url,
      expirationDate: option.expirationDate,
      signed,
    };
  }
}

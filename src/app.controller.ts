import { Controller, Get, Param } from '@nestjs/common';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { SignedUrlGuard } from 'nestjs-url-generator/dist/signed-url-guard';
import { AppService } from './app.service';
import { NestMailerService } from './nest-mailer/nest-mailer.service';
import { NestUrlGeneratorService } from './nest-url-generator/nest-url-generator.service';
import { ETimes, UtilDateProvider } from './util-date/util-date.provider';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly nestMailerService: NestMailerService,
    private readonly nestUrlGeneratorService: NestUrlGeneratorService,
    private readonly utilDateProvider: UtilDateProvider,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth-email')
  @UseGuards(SignedUrlGuard)
  authEmail(@Query('signed') signed: string) {
    return signed;
  }

  @Get('/g-url-test')
  gUrlTest() {
    return this.nestUrlGeneratorService.generateSignedControllerUrl({
      controller: AppController,
      controllerMethod: AppController.prototype.authEmail,
      expirationDate: this.utilDateProvider.addTime(5, ETimes.MIN),
    });
  }

  @Get('/mail/:email')
  async sendMail(@Param('email') email: string) {
    const { url, signed, expirationDate } =
      this.nestUrlGeneratorService.generateSignedControllerUrl({
        controller: AppController,
        controllerMethod: AppController.prototype.authEmail,
        expirationDate: this.utilDateProvider.addTime(5, ETimes.MIN),
      });

    return this.nestMailerService.send(
      [email],
      '메일전송 테스트',
      'auth-mail',
      { content: `메일 인증 주소: ${url}` },
    );
  }
}

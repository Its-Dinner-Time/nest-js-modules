import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NestMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async send(
    tos: string[],
    subject: string,
    template: string,
    context: any = {},
  ) {
    return await this.mailerService.sendMail({
      to: tos.join(', '),
      subject,
      template,
      context,
    });
  }
}

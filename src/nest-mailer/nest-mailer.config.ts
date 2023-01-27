import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

export default (config: ConfigService) => {
  const EMAIL_HOST: string = config.getOrThrow('EMAIL_HOST'); // 메일서버
  const EMAIL_AUTH_EMAIL: string = config.getOrThrow('EMAIL_AUTH_EMAIL'); // 메일서버의 이메일

  const EMAIL_AUTH_USERNAME: string = config.getOrThrow('EMAIL_AUTH_USERNAME'); // 메일서버 접속 id
  const EMAIL_AUTH_PASSWORD: string = config.getOrThrow('EMAIL_AUTH_PASSWORD'); // 메일서버 접속 password

  const EMAIL_TEMPLATE_DIR: string = config.getOrThrow('EMAIL_TEMPLATE_DIR'); // 메일 템플릿
  const EMAIL_DEFAULT_SENDUSER = 'no-reply'; // 보내는 사람 이름

  return {
    transport: {
      host: EMAIL_HOST,
      port: 587,
      auth: {
        user: EMAIL_AUTH_USERNAME,
        pass: EMAIL_AUTH_PASSWORD,
      },
    },
    template: {
      dir: process.cwd() + EMAIL_TEMPLATE_DIR,
      adapter: new HandlebarsAdapter(), // mail template으로 handlebars사용 (*.hbs)
      options: {
        strict: true,
      },
    },
    // 기본 옵션
    defaults: {
      from: `"${EMAIL_DEFAULT_SENDUSER}" <${EMAIL_AUTH_EMAIL}>`,
    },
  };
};

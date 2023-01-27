import { ConfigService } from '@nestjs/config';

export default (config: ConfigService) => {
  const URL_GENERATOR_SECRET = config.get('URL_GENERATOR_SECRET') || 'secret';
  const APP_URL = config.get('APP_URL') || 'http://localhost:3000';

  return {
    secret: URL_GENERATOR_SECRET,
    appUrl: APP_URL,
  };
};

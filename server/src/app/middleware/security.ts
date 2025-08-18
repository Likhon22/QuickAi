import type { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
export const applySecurity = (app: Application) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'script-src': ["'self'"],
          'style-src': ["'self'"],
          'img-src': ["'self'", 'data:', 'https:'],
          'default-src': ["'self'", 'https:'],
        },
      },
    }),
  );
  app.use(
    compression({
      level: 6,
      threshold: 1024,
    }),
  );
  app.set('trust proxy', 1);
};

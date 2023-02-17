import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ServiceBroker } from 'moleculer';
import * as ApiService from 'moleculer-web';

@Injectable()
export class MoleculerMiddleware implements NestMiddleware {
  private middleware: any;
  constructor(@Inject('BROKER') private broker: ServiceBroker) {
    const svc = broker.createService({
      name: 'api',
      mixins: [ApiService],

      settings: {
        server: false, // Default is "true"
        routes: [
          {
            path: '/api',
            whitelist: ['**'],
          },
        ],
      },
    });

    this.middleware = svc.express();
  }

  use(req: any, res: any, next: () => void) {
    console.log('MoleculerMiddleware');
    this.broker.logger.info('MoleculerMiddleware');
    this.middleware(req, res, next);
  }
}

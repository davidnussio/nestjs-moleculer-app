import { Module } from '@nestjs/common';
import { ServiceBroker } from 'moleculer';
import { MoleculerService } from './moleculer.service';

const brokerProvider = {
  provide: 'BROKER',
  useFactory: async () => {
    const broker = new ServiceBroker({
      namespace: 'moleculer-api',
      logLevel: 'debug',
    });
    broker.loadServices(__dirname + '/services', '**/*.service.js');
    await broker.start();
    return broker;
  },
};

@Module({
  providers: [brokerProvider, MoleculerService],
  exports: [brokerProvider, MoleculerService],
})
export class MoleculerModule {}

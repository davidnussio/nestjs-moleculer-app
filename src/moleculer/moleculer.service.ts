import { Inject, Injectable } from '@nestjs/common';
import { ServiceBroker } from 'moleculer';

@Injectable()
export class MoleculerService {
  constructor(@Inject('BROKER') private broker: ServiceBroker) {}

  get() {
    return this.broker;
  }
}

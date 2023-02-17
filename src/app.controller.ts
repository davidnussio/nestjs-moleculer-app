import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MoleculerService } from './moleculer/moleculer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly broker: MoleculerService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('moleculer')
  getMoleculer() {
    return this.broker.get().call('greeter.hello');
  }
}

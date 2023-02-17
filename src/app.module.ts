import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoleculerMiddleware } from './moleculer/moleculer.middleware';
import { MoleculerModule } from './moleculer/moleculer.module';
import { MoleculerService } from './moleculer/moleculer.service';

@Module({
  imports: [MoleculerModule],
  controllers: [AppController],
  providers: [AppService, MoleculerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MoleculerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

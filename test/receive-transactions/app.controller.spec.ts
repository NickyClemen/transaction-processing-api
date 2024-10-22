import { INestApplication } from '@nestjs/common';

import CreateNestApplication from '../mocks/api/testClient';
import { AppController } from '../../modules/receive-transactions/src/app.controller';
import { AppService } from '../../modules/receive-transactions/src/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const createNestApplication: CreateNestApplication =
      new CreateNestApplication({
        controllers: [AppController],
        providers: [AppService],
      });

    const app: INestApplication = await createNestApplication.create();
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

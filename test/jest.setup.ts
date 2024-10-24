import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import CreateNestApplication from './shared/__mocks__/infraestructure/createNestApplication.mock';
import Server from './shared/__mocks__/api/infraestructure/server';
import receiveTransactionsModule from './shared/__mocks__/apps/receive-transactions/receive-transactions.module';
import { preProcessingTransactionsModule } from './shared/__mocks__/apps/preprocessing-transactions/preprocessing-transactions.module';

let app: INestApplication;
export let server: Server;

beforeEach(async (): Promise<void> => {
  const createNestApplication = new CreateNestApplication({
    imports: [
      receiveTransactionsModule,
      preProcessingTransactionsModule,
      ConfigModule.forRoot({
        envFilePath: ['.env.testing'],
      }),
    ],
  });

  app = await createNestApplication.create();
  await app.init();

  server = new Server(app);
});

afterEach(async (): Promise<void> => {
  await app.close();
});

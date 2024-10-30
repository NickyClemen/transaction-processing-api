import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import CreateNestApplication from './__mocks__/createNestApplication.mock';
import Server from './__mocks__/server';

import { queuedTransactionsModule } from './__mocks__/queued-transactions.module';

let app: INestApplication;
export let server: Server;

beforeEach(async (): Promise<void> => {
  const createNestApplication = new CreateNestApplication({
    imports: [
      queuedTransactionsModule,
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

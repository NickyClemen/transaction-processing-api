import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { queuedTransactionsModule } from './__mocks__/queued-transactions.module';
import { transactionMock } from './__mocks__/transaction.mock';
import CreateNestApplication from './__mocks__/createNestApplication.mock';
import Server from './__mocks__/server';

let app: INestApplication;
export let server: Server;

describe('[POST] ReceiveTransaction', () => {
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

  test('/transactions/receive', () => {
    return server
      .post('/transactions/receive')
      .send(transactionMock)
      .expect(HttpStatus.OK);
  });
});

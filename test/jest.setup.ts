import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import HttpExceptionHandler from '../src/libraries/exceptions/httpExceptionHandler';

import SqsProvider from '../src/libraries/aws/sqs.provider';
import { sqsProviders } from '../src/libraries/aws/awsClients.provider';

import ReceiveTransactionsController from '../src/receive-transactions/intraestructure/controllers/receive-transactions.controller';
import SendTransactionToSqs from '../src/receive-transactions/application/providers/sendTransactionToSqs.service';

import CreateNestApplication from './mocks/api/testClient';
import Server from './mocks/api/server';

let app: INestApplication;
export let server: Server;

beforeEach(async (): Promise<void> => {
  const createNestApplication = new CreateNestApplication({
    controllers: [ReceiveTransactionsController],
    providers: [
      HttpExceptionHandler,
      SendTransactionToSqs,
      SqsProvider,
      sqsProviders,
    ],
    imports: [
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

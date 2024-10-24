import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import HttpExceptionHandler from '../src/shared/api/domain/exceptions/httpExceptionHandler';

import ReceiveTransactionsController from '../src/contexts/transactions/infraestructure/controllers/receive-transactions.controller';
import SendTransactionToSqs from '../src/contexts/transactions/application/sendTransactionToSqs.provider';
import SendMessageToSqs from '../src/shared/providers/aws/application/sendMessageToSqs.provider';
import SqsProvider from '../src/shared/providers/aws/application/sqs.provider';
import { sqsProviders } from '../src/shared/providers/aws/infraestructure/awsClients.provider';

import CreateNestApplication from './shared/api/application/testClient';
import Server from './shared/api/infraestructure/server';

let app: INestApplication;
export let server: Server;

beforeEach(async (): Promise<void> => {
  const createNestApplication = new CreateNestApplication({
    controllers: [ReceiveTransactionsController],
    providers: [
      HttpExceptionHandler,
      SendTransactionToSqs,
      SendMessageToSqs,
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

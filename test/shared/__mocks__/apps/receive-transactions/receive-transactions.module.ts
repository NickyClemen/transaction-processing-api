import { ConfigModule } from '@nestjs/config';

import HttpExceptionHandler from '../../../../../src/shared/api/domain/exceptions/httpExceptionHandler';

import ReceiveTransactionsController from '../../../../../src/apps/receive-transactions/controllers/receive-transactions.controller';
import SendTransactionToSqs from '../../../../../src/contexts/transactions/application/sendTransactionToSqs.provider';
import SendMessageToSqs from '../../../../../src/shared/providers/aws/application/sendMessageToSqs.provider';
import SqsProvider from '../../../../../src/shared/providers/aws/application/sqs.provider';
import { sqsProviders } from '../../../../../src/shared/providers/aws/infraestructure/awsClients.provider';

const receiveTransactionsModule = {
  module: class ReceiveTransactionsModule {},
  controllers: [ReceiveTransactionsController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.testing'],
    }),
  ],
  providers: [
    HttpExceptionHandler,
    SendTransactionToSqs,
    SendMessageToSqs,
    SqsProvider,
    sqsProviders,
  ],
};

export default receiveTransactionsModule;

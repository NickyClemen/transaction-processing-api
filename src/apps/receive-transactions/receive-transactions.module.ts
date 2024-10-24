import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ReceiveTransactionsController from './controllers/receive-transactions.controller';
import SendTransactionToSqs from '../../contexts/transactions/application/sendTransactionToSqs.provider';

import HttpExceptionHandler from '../../shared/api/domain/exceptions/httpExceptionHandler';
import SendMessageToSqs from '../../shared/providers/aws/application/sendMessageToSqs.provider';
import SqsProvider from '../../shared/providers/aws/application/sqs.provider';
import { sqsProviders } from '../../shared/providers/aws/infraestructure/awsClients.provider';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ReceiveTransactionsController],
  providers: [
    HttpExceptionHandler,
    SendTransactionToSqs,
    SendMessageToSqs,
    SqsProvider,
    sqsProviders,
  ],
})
export class ReceiveTransactionsModule {}

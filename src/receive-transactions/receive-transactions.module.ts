import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import HttpExceptionHandler from '../libraries/exceptions/httpExceptionHandler';

import SqsProvider from '../libraries/aws/sqs.provider';
import { sqsProviders } from '../libraries/aws/awsClients.provider';

import SendTransactionToSqs from './application/providers/sendTransactionToSqs.service';
import ReceiveTransactionsController from './intraestructure/controllers/receive-transactions.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ReceiveTransactionsController],
  providers: [
    HttpExceptionHandler,
    SendTransactionToSqs,
    SqsProvider,
    sqsProviders,
  ],
})
export class ReceiveTransactionsModule {}

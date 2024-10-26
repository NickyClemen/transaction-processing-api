import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { QueuedTransactionInDynamo } from '../../../src/contexts/transaction-processing/queued-transactions/queuedTransactionInDynamo.provider';
import QueuedTransactionRepository from '../../../src/contexts/transaction-processing/queued-transactions/queueTransaction.repository';
import SendTransactionToSqs from '../../../src/contexts/transaction-processing/transactions/application/sendTransactionToSqs.provider';

import HttpExceptionHandler from '../../../src/shared/apps/domain/exceptions/httpExceptionHandler';

import SendMessageToSqs from '../../../src/shared/providers/aws/application/sendMessageToSqs.provider';
import {
  dynamoConnector,
  sqsProviders,
} from '../../../src/shared/providers/aws/infraestructure/awsClients.provider';
import SqsProvider from '../../../src/shared/providers/aws/infraestructure/sqs.provider';

import ReceiveTransactionsController from './infraestructure/controllers/receive-transactions.controller';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ReceiveTransactionsController],
  providers: [
    HttpExceptionHandler,
    QueuedTransactionRepository,
    QueuedTransactionInDynamo,
    SendTransactionToSqs,
    SendMessageToSqs,
    SqsProvider,
    sqsProviders,
    dynamoConnector,
  ],
})
export class ReceiveTransactionsModule {}

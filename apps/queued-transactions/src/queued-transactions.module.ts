import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import QueuedTransactionRepository from '../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';

import SendMessage from '../../../shared/infraestructure/aws/infraestructure/sqs/application/sendMessage.provider';
import SqsProvider from '../../../shared/infraestructure/aws/infraestructure/sqs/application/sqs.provider';
import { dynamoConnector } from '../../../shared/infraestructure/aws/infraestructure/dynamo/infraestructure/dynamo.repository';
import { SqsProvide } from '../../../shared/infraestructure/aws/infraestructure/sqs/infraestructure';

import HttpExceptionHandler from './domain/exceptions/httpExceptionHandler';
import SendTransaction from './application/sendTransaction.provider';
import QueuedTransactionsController from './infraestructure/controllers/queued-transactions.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [QueuedTransactionsController],
  providers: [
    HttpExceptionHandler,
    SendTransaction,
    SendMessage,
    SqsProvider,
    SqsProvide,
    dynamoConnector,
    {
      provide: QueuedTransactionRepository.QUEUED_TRANSACTION_REPOSITORY,
      useClass: QueuedTransactionRepository,
    },
  ],
})
export class QueuedTransactionModule {}

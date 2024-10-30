import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SqsProvide } from '../../../shared/infraestructure/aws/infraestructure/sqs/infraestructure';
import SendMessage from '../../../shared/infraestructure/aws/infraestructure/sqs/application/receiveMessage.provider';
import SqsProvider from '../../../shared/infraestructure/aws/infraestructure/sqs/application/sqs.provider';

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
  ],
})
export class QueuedTransactionModule {}

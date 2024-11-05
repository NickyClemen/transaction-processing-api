import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ValidatorServiceModule } from '../../../apps/validation-service/validator-service.module';

import QueuedTransactionRepository from '../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';
import TransactionRepository from '../../../contexts/transactions/infraestructure/transactions.repository';

import { dynamoConnector } from '../../../shared/infraestructure/aws/infraestructure/dynamo/infraestructure/dynamo.repository';
import DeleteMessage from '../../../shared/infraestructure/aws/infraestructure/sqs/application/deleteMessage.provider';
import SqsProvider from '../../../shared/infraestructure/aws/infraestructure/sqs/application/sqs.provider';
import { SqsProvide } from '../../../shared/infraestructure/aws/infraestructure/sqs/infraestructure';

import { ProcessMessages } from './application/processMessages.provider';
import ReceiveMessagesFromSqs from './application/receiveMessagesFromSqs.provider';
import DeleteMessagesFromSqs from './application/deleteMessagesFromSqs.provider';

@Module({
  providers: [
    ReceiveMessagesFromSqs,
    ProcessMessages,
    DeleteMessagesFromSqs,
    DeleteMessage,
    SqsProvider,
    SqsProvide,
    dynamoConnector,
    {
      provide: QueuedTransactionRepository.QUEUED_TRANSACTION_REPOSITORY,
      useClass: QueuedTransactionRepository,
    },
    {
      provide: TransactionRepository.TRANSACTION_REPOSITORY,
      useClass: TransactionRepository,
    },
  ],
  imports: [ConfigModule.forRoot({}), ValidatorServiceModule],
})
export class ReceiveTransactionsModule {}

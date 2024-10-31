import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import QueuedTransactionRepository from '../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';

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
    QueuedTransactionRepository,
    SqsProvider,
    SqsProvide,
    dynamoConnector,
  ],
  imports: [ConfigModule.forRoot({})],
})
export class ReceiveTransactionsModule {}

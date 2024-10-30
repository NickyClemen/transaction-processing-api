import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import QueuedTransactionRepository from '../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';

import { dynamoConnector } from '../../../shared/infraestructure/aws/infraestructure/dynamo/infraestructure/dynamo.repository';

import { ProcessMessages } from './application/processMessages.provider';
import ReceiveMessagesFromSqs from './application/receiveMessagesFromSqs.provider';

@Module({
  providers: [
    ReceiveMessagesFromSqs,
    ProcessMessages,
    QueuedTransactionRepository,
    dynamoConnector,
  ],
  imports: [ConfigModule.forRoot({})],
})
export class ReceiveTransactionsModule {}

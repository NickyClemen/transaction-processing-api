import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import DeleteMessagesFromSqs from '../../../../apps/receive-transactions/src/application/deleteMessagesFromSqs.provider';
import QueuedTransactionRepository from '../../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';

import SqsProvider from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/sqs.provider';
import DeleteMessage from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/deleteMessage.provider';
import { SqsProvide } from '../../../../shared/infraestructure/aws/infraestructure/sqs/infraestructure';
import { dynamoConnector } from '../../../../shared/infraestructure/aws/infraestructure/dynamo/infraestructure/dynamo.repository';

import { ProcessMessages } from '../../src/application/processMessages.provider';
import ReceiveMessagesFromSqs from '../../src/application/receiveMessagesFromSqs.provider';

import sqsEventMock from './sqs.event.mock';

const receiveTransactionsProvidersMetadata: ModuleMetadata = {
  providers: [
    ReceiveMessagesFromSqs,
    ProcessMessages,
    {
      provide: QueuedTransactionRepository,
      useValue: {
        getItem: async () => sqsEventMock.Records[0],
        putItem: async () => ({
          status: 200,
          requestId: '1',
        }),
      },
    },
    {
      provide: DeleteMessagesFromSqs,
      useValue: {
        deleteMessage: async () => ({
          status: 200,
          requestId: '1',
        }),
      },
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.testing'],
    }),
  ],
};

const receiveTransactionsMetadata: ModuleMetadata = {
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
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.testing'],
    }),
  ],
};

export { receiveTransactionsMetadata, receiveTransactionsProvidersMetadata };

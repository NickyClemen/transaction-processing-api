import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validationServiceMetadata } from '../../../../apps/validation-service/test/__mocks__/validation-service.module.mock';
import DeleteMessagesFromSqs from '../../../../apps/receive-transactions/src/application/deleteMessagesFromSqs.provider';

import QueuedTransactionRepository from '../../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';
import TransactionRepository from '../../../../contexts/transactions/infraestructure/transactions.repository';

import SqsProvider from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/sqs.provider';
import DeleteMessage from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/deleteMessage.provider';
import { SqsProvide } from '../../../../shared/infraestructure/aws/infraestructure/sqs/infraestructure';
import { dynamoConnector } from '../../../../shared/infraestructure/aws/infraestructure/dynamo/infraestructure/dynamo.repository';

import { ProcessMessages } from '../../src/application/processMessages.provider';
import ReceiveMessagesFromSqs from '../../src/application/receiveMessagesFromSqs.provider';

import sqsEventMock from './sqs.event.mock';
import { transactionCompleteMock } from './transaction.mock';

import {
  queuedTransactionRepository,
  accountRepository,
  transactionRepository,
} from '../../../validation-service/test/__mocks__/providers.mock';

const receiveTransactionsMetadata: ModuleMetadata = {
  imports: [
    {
      module: class ValidatorServiceModuleMock {},
      ...validationServiceMetadata,
      providers: [
        ...validationServiceMetadata.providers,
        queuedTransactionRepository,
        accountRepository,
        transactionRepository,
      ],
    },
    ConfigModule.forRoot({
      envFilePath: ['.env.testing'],
    }),
  ],
  providers: [
    SqsProvide,
    SqsProvider,
    DeleteMessage,
    ReceiveMessagesFromSqs,
    ProcessMessages,
    {
      provide: TransactionRepository.TRANSACTION_REPOSITORY,
      useValue: {
        getItem: async () => ({
          status: 200,
          requestId: '1',
          item: transactionCompleteMock,
        }),
      },
    },
    {
      provide: QueuedTransactionRepository.QUEUED_TRANSACTION_REPOSITORY,
      useValue: {
        getItem: async () => ({
          status: 200,
          requestId: '1',
          item: sqsEventMock.Records[0],
        }),
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
};

export { receiveTransactionsMetadata };

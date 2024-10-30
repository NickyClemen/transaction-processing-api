import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import QueuedTransactionRepository from '../../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';
import { dynamoConnector } from '../../../../shared/infraestructure/aws/infraestructure/dynamo/infraestructure/dynamo.repository';

import { ProcessMessages } from '../../src/application/processMessages.provider';
import ReceiveMessagesFromSqs from '../../src/application/receiveMessagesFromSqs.provider';

const receiveTransactionsMetadata: ModuleMetadata = {
  providers: [
    ReceiveMessagesFromSqs,
    ProcessMessages,
    QueuedTransactionRepository,
    dynamoConnector,
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.testing'],
    }),
  ],
};

export { receiveTransactionsMetadata };

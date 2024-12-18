import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import SendTransaction from '../../src/application/sendTransaction.provider';
import QueuedTransactionsController from '../../src/infraestructure/controllers/queued-transactions.controller';

import QueuedTransactionRepository from '../../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';

import { dynamoConnector } from '../../../../shared/infraestructure/aws/infraestructure/dynamo/infraestructure/dynamo.repository';
import { SqsProvide } from '../../../../shared/infraestructure/aws/infraestructure/sqs/infraestructure';
import SendMessage from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/sendMessage.provider';
import SqsProvider from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/sqs.provider';

import ModuleBuilder from './moduleBuilder.mock';

const queuedTransactionMetadata: ModuleMetadata = {
  imports: [ConfigModule.forRoot()],
  controllers: [QueuedTransactionsController],
  providers: [
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
};

const queuedTransactionModuleFixture = async (): Promise<ModuleBuilder> => {
  const moduleBuilder: ModuleBuilder = new ModuleBuilder(
    queuedTransactionMetadata,
  );

  return moduleBuilder;
};

const queuedTransactionsModule = {
  module: class QueuedTransactionsModule {},
  ...queuedTransactionMetadata,
};

export {
  queuedTransactionMetadata,
  queuedTransactionModuleFixture,
  queuedTransactionsModule,
};

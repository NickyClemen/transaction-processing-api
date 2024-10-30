import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import HttpExceptionHandler from '../../../../apps/queued-transactions/src/domain/exceptions/httpExceptionHandler';
import SendTransaction from '../../src/application/sendTransaction.provider';
import QueuedTransactionsController from '../../../../apps/queued-transactions/src/infraestructure/controllers/queued-transactions.controller';

import { SqsProvide } from '../../../../shared/infraestructure/aws/infraestructure/sqs/infraestructure';
import SendMessage from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/receiveMessage.provider';
import SqsProvider from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/sqs.provider';

import ModuleBuilder from '../__mocks__/moduleBuilder.mock';

const queuedTransactionMetadata: ModuleMetadata = {
  imports: [ConfigModule.forRoot()],
  controllers: [QueuedTransactionsController],
  providers: [
    HttpExceptionHandler,
    SendTransaction,
    SendMessage,
    SqsProvider,
    SqsProvide,
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

import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ReceiveTransactionsController from '../../../../../src/apps/receive-transactions/infraestructure/controllers/receive-transactions.controller';

import QueuedTransactionRepository from '../../../../../src/contexts/transaction-processing/queued-transactions/queueTransaction.repository';
import { QueuedTransactionInDynamo } from '../../../../../src/contexts/transaction-processing/queued-transactions/queuedTransactionInDynamo.provider';
import SendTransactionToSqs from '../../../../../src/contexts/transaction-processing/transactions/application/sendTransactionToSqs.provider';

import HttpExceptionHandler from '../../../../../src/shared/apps/domain/exceptions/httpExceptionHandler';

import SqsProvider from '../../../../../src/shared/providers/aws/infraestructure/sqs.provider';
import SendMessageToSqs from '../../../../../src/shared/providers/aws/application/sendMessageToSqs.provider';
import {
  sqsProviders,
  dynamoConnector,
} from '../../../../../src/shared/providers/aws/infraestructure/awsClients.provider';

import ModuleBuilder from '../../infraestructure/moduleBuilder.mock';

const receiveTransactionMetadata: ModuleMetadata = {
  imports: [ConfigModule.forRoot()],
  controllers: [ReceiveTransactionsController],
  providers: [
    HttpExceptionHandler,
    QueuedTransactionRepository,
    QueuedTransactionInDynamo,
    SendTransactionToSqs,
    SendMessageToSqs,
    SqsProvider,
    sqsProviders,
    dynamoConnector,
  ],
};

const receiveTransactionModuleFixture = async (): Promise<ModuleBuilder> => {
  const moduleBuilder: ModuleBuilder = new ModuleBuilder(
    receiveTransactionMetadata,
  );

  return moduleBuilder;
};

const receiveTransactionsModule = {
  module: class ReceiveTransactionsModule {},
  ...receiveTransactionMetadata,
};

export {
  receiveTransactionMetadata,
  receiveTransactionModuleFixture,
  receiveTransactionsModule,
};

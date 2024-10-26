import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ReceiveTransactionFromSqs from '../../../../../src/contexts/transaction-processing/transactions/application/receiveTransactionFromSqs.provider';

import ReceiveMessageFromSqs from '../../../../../src/shared/providers/aws/application/receiveMessageFromSqs.provider';
import SqsProvider from '../../../../../src/shared/providers/aws/infraestructure/sqs.provider';
import { sqsProviders } from '../../../../../src/shared/providers/aws/infraestructure/awsClients.provider';

import ModuleBuilder from '../../infraestructure/moduleBuilder.mock';

const preProcessingTransactionsMetadata: ModuleMetadata = {
  providers: [
    ReceiveTransactionFromSqs,
    ReceiveMessageFromSqs,
    SqsProvider,
    sqsProviders,
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.testing'],
    }),
  ],
};

const preProcessingTransactionsModuleFixture =
  async (): Promise<ModuleBuilder> => {
    const moduleBuilder: ModuleBuilder = new ModuleBuilder(
      preProcessingTransactionsMetadata,
    );

    return moduleBuilder;
  };

const preProcessingTransactionsModule = {
  module: class PreProcessingTransactionModule {},
  ...preProcessingTransactionsMetadata,
};

export {
  preProcessingTransactionsModuleFixture,
  preProcessingTransactionsModule,
  preProcessingTransactionsMetadata,
};

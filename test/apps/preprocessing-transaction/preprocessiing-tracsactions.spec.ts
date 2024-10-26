import { TestingModule } from '@nestjs/testing';

import ReceiveTransactionFromSqs from '../../../src/contexts/transaction-processing/transactions/application/receiveTransactionFromSqs.provider';

import { preProcessingTransactionsMetadata } from '../../shared/__mocks__/apps/preprocessing-transactions/preprocessing-transactions.module';
import ModuleBuilder from '../../shared/__mocks__/infraestructure/moduleBuilder.mock';

describe('', () => {
  const moduleBuilder: ModuleBuilder = new ModuleBuilder(
    preProcessingTransactionsMetadata,
  );

  test('', async () => {
    const moduleFixture: TestingModule = await moduleBuilder.moduleBuilder();
    const receiveTransactionsFromSqs =
      moduleFixture.get<ReceiveTransactionFromSqs>(ReceiveTransactionFromSqs);

    await receiveTransactionsFromSqs.execute();
  });
});

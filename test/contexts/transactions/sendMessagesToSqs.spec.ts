import { TestingModule } from '@nestjs/testing';

import SendTransactionToSqs from '../../../src/contexts/transaction-processing/transactions/application/sendTransactionToSqs.provider';
import { QueuedTransactionInDynamo } from '../../../src/contexts/transaction-processing/queued-transactions/queuedTransactionInDynamo.provider';
import { SendMessageResponseMapper } from '../../../src/shared/providers/aws/domain/interfaces/sqs.interface';
// import { QueuedTransaction } from '../../../src/contexts/transaction-processing/queued-transactions/queuedTransaction';

import { receiveTransactionMetadata } from '../../shared/__mocks__/apps/receive-transactions/receive-transactions.module';

import { transactionMock } from '../../shared/__mocks__/data/transaction.mock';
import ModuleBuilder from '../../shared/__mocks__/infraestructure/moduleBuilder.mock';

describe('', () => {
  const moduleBuilder: ModuleBuilder = new ModuleBuilder(
    receiveTransactionMetadata,
  );

  test('', async () => {
    const moduleFixture: TestingModule = await moduleBuilder.moduleBuilder();
    const sendTransactionsToSqs =
      moduleFixture.get<SendTransactionToSqs>(SendTransactionToSqs);

    const queuedTransactionInDynamo =
      moduleFixture.get<QueuedTransactionInDynamo>(QueuedTransactionInDynamo);

    const { messageId, md5OfMessageBody }: SendMessageResponseMapper =
      await sendTransactionsToSqs.execute(transactionMock);

    await queuedTransactionInDynamo.enqueueTransactions({
      ...transactionMock,
      messageId,
      md5OfMessageBody,
    });
  });
});

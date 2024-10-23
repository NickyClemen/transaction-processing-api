import { HttpStatus } from '@nestjs/common';

import { server } from '../jest.setup';
import { transactionMock } from '../mocks/data/transaction.mock';

describe('[POST]ReceiveTransaction', () => {
  const { transaction } = transactionMock;

  test('/transactions/receive', () => {
    return server
      .post('/transactions/receive')
      .send(transaction)
      .expect(HttpStatus.OK);
  });
});

import { HttpStatus } from '@nestjs/common';

import { server } from '../../jest.setup';
import { transactionMock } from '../../shared/__mocks__/data/transaction.mock';

describe('[POST] ReceiveTransaction', () => {
  test('/transactions/receive', () => {
    return server
      .post('/transactions/receive')
      .send(transactionMock)
      .expect(HttpStatus.OK);
  });
});

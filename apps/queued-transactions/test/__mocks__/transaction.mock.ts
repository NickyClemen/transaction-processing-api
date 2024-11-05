import { ITransaction } from '../../../../contexts/transactions/domain/transaction';

import buyer from './buyer.mock';

const transactionMock: Omit<ITransaction, 'id'> = {
  buyer,
  externalId: '019b904c-7923-4665-b013-de0298f49e3d',
  name: 'Instant payment',
  description: 'Description of my instant payment',
  amount: 100,
  currency: 'ARS',
  type: 'FUNDS_IN_ACCOUNT',
  ip: '181.26.41.25',
  created_at: new Date().getTime(),
};

const transactionCompleteMock: ITransaction = {
  buyer,
  id: '23195c1b-262b-44e8-8593-8479fb6acf23',
  externalId: '019b904c-7923-4665-b013-de0298f49e3d',
  name: 'Instant payment',
  description: 'Description of my instant payment',
  amount: 100,
  currency: 'ARS',
  type: 'FUNDS_IN_ACCOUNT',
  ip: '181.26.41.25',
  created_at: new Date().getTime(),
};

export { transactionMock, transactionCompleteMock };

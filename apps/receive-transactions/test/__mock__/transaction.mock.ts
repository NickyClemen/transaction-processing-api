import buyer from '../../../validation-service/__mocks__/buyer.mock';

export const transactionMock = {
  buyer,
  externalId: '019b904c-7923-4665-b013-de0298f49e3d',
  name: 'Instant payment',
  description: 'Description of my instant payment',
  amount: 100,
  currency: 'ARS',
  type: 'FUNDS_IN_ACCOUNT',
  ip: '181.26.41.25',
  status: 'PROCESSING',
};

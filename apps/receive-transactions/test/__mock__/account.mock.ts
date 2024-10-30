import clientMock from './buyer.mock';

export default {
  ...clientMock,
  associated_cards: [],
  balance: {
    currency: 'AR',
    funds: 1000.0,
  },
};

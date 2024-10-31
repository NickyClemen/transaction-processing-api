import buyerMock from './buyer.mock';

export default {
  ...buyerMock,
  associated_cards: [],
  balance: {
    currency: 'ARS',
    funds: 1000.0,
  },
};

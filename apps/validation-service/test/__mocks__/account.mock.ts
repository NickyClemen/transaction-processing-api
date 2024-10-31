import buyer from './buyer.mock';

export default {
  ...buyer,
  associated_cards: [],
  balance: {
    currency: 'ARS',
    funds: 1000.0,
  },
};

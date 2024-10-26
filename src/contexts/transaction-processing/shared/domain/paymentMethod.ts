import { ValueObject } from '../../../../shared/apps/domain/valueObjects/valueObject';

import { ICard } from './card';

export class PaymentMethod extends ValueObject<ICard> {
  constructor(readonly value) {
    super(value);
  }

  getValueByTransactionType(type) {
    return {
      CARD: this.value.card.limit,
      FUNDS_IN_ACCOUNT: this.value.balance,
    }[type];
  }
}

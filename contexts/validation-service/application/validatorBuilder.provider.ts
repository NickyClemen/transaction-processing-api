import { TransactionMessageBody } from '../../transactions/domain/transaction';

import BalanceValidator from './balanceValidator.provider';
import IpValidator from './ipValidator.provider';
import CurrencyValidator from './currencyValidator.provider';
import CountTransactionsPerPeriod from './countTransactionsPerPeriod';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
class ValidatorBuilder {
  private readonly validators = new Map();

  constructor(
    @Inject(BalanceValidator)
    private readonly balanceValidator: BalanceValidator,
    @Inject(IpValidator)
    private readonly ipValidator: IpValidator,
    @Inject(CurrencyValidator)
    private readonly currencyValidator: CurrencyValidator,
    @Inject(CountTransactionsPerPeriod)
    private readonly countTransactionsPerPeriod: CountTransactionsPerPeriod,
  ) {
    this.validators.set(
      BalanceValidator.BALANCE_VALIDATOR,
      async (transaction: TransactionMessageBody) =>
        await this.balanceValidator.execute(transaction),
    );

    this.validators.set(
      IpValidator.IP_VALIDATOR,
      async (transaction: TransactionMessageBody) =>
        await this.ipValidator.execute(transaction),
    );

    this.validators.set(
      CurrencyValidator.CURRENCY_VALIDATOR,
      async (transaction: TransactionMessageBody) =>
        await this.currencyValidator.execute(transaction),
    );

    this.validators.set(
      CountTransactionsPerPeriod.COUNT_TRANSACTION_PER_PERIOD,
      async (transaction: TransactionMessageBody) =>
        await this.countTransactionsPerPeriod.execute(transaction),
    );
  }

  async execute(transaction: TransactionMessageBody) {
    return await Promise.all([
      this.validators.get(BalanceValidator.BALANCE_VALIDATOR)(transaction),
      this.validators.get(IpValidator.IP_VALIDATOR)(transaction),
      this.validators.get(CurrencyValidator.CURRENCY_VALIDATOR)(transaction),
      this.validators.get(
        CountTransactionsPerPeriod.COUNT_TRANSACTION_PER_PERIOD,
      )(transaction),
    ]);
  }
}

export default ValidatorBuilder;

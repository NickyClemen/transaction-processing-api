import { Injectable } from '@nestjs/common';
import { ITransaction } from '../../contexts/transactions/domain/transaction';

@Injectable()
export default class CurrencyValidator {
  constructor(private readonly supportedCurrencies: string[] = ['AR']) {}
  async execute(transaction: ITransaction) {
    const { currency } = transaction;
    return this.supportedCurrencies.find((curr: string) => curr === currency);
  }
}

import { Inject, Injectable } from '@nestjs/common';

import {
  IAccount,
  IAccountRepository,
} from '../../../contexts/accounts/domain/account';

import { TransactionMessageBody } from '../../transactions/domain/transaction';

import CurrencyValidatorException from '../domain/exceptions/currencyValidator.exception';

import AccountRepository from '../../../contexts/accounts/infraestructure/account.repository';
import { ResponseMapper } from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';

@Injectable()
export default class CurrencyValidator {
  static readonly CURRENCY_VALIDATOR = 'currency_validator';

  constructor(
    @Inject(AccountRepository.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {}
  async execute(transaction: TransactionMessageBody) {
    const { buyer, currency } = transaction;
    const response: ResponseMapper = await this.accountRepository.getItem({
      id: buyer.id,
      email: buyer.email,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      personalIdNumber: buyer.personalIdNumber,
    });

    const { balance } = response.item as IAccount;

    if (balance.currency !== currency) {
      throw new CurrencyValidatorException();
    }
  }
}

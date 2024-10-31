import { Inject, Injectable } from '@nestjs/common';

import { IAccount, IAccountRepository } from '../../accounts/domain/account';
import { TransactionMessageBody } from '../../transactions/domain/transaction';

import BalanceValidatorException from '../domain/exceptions/balanceValidator.exception';

import AccountRepository from '../../../contexts/accounts/infraestructure/account.repository';

import { ResponseMapper } from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';

@Injectable()
export default class BalanceValidator {
  static readonly BALANCE_VALIDATOR = 'balance_validator';
  constructor(
    @Inject(AccountRepository.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {}
  async execute(transaction: TransactionMessageBody) {
    const { buyer, amount } = transaction;
    const response: ResponseMapper = await this.accountRepository.getItem({
      id: buyer.id,
      email: buyer.email,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      personalIdNumber: buyer.personalIdNumber,
    });

    const { balance } = response.item as IAccount;
    if (amount >= balance.funds) {
      throw new BalanceValidatorException();
    }
  }
}

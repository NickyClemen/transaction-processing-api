import { Injectable, Inject } from '@nestjs/common';

import { lookup } from 'ip-location-api';

import { ITransaction } from '../../contexts/transactions/domain/transaction';
import { IAccount } from '../../contexts/accounts/domain/account';

import { IRepository } from '../../shared/domain/interfaces/repository.interface';

@Injectable()
export default class CurrencyValidator {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: IRepository,
  ) {}
  async execute(transaction: ITransaction) {
    const { buyer, ip } = transaction;
    const checkCountryIp = await lookup(ip);
    const account: IAccount = await this.accountRepository.getItem({
      id: buyer.id,
      email: buyer.email,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      personalIdNumber: buyer.personalIdNumber,
    });

    return account.country === checkCountryIp.country_name;
  }
}

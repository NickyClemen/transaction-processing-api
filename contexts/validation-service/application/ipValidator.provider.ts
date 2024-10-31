import { Injectable, Inject } from '@nestjs/common';

import { lookup } from 'ip-location-api';

import AccountRepository from '../../../contexts/accounts/infraestructure/account.repository';

import { ResponseMapper } from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';

import { IAccount, IAccountRepository } from '../../accounts/domain/account';
import { TransactionMessageBody } from '../../transactions/domain/transaction';

import IpValidatorException from '../domain/exceptions/ipValidator.exception';

@Injectable()
export default class IpValidator {
  static readonly IP_VALIDATOR = 'ip_validator';
  constructor(
    @Inject(AccountRepository.ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
  ) {}
  async execute(transaction: TransactionMessageBody) {
    const { buyer, ip } = transaction;
    const checkCountryIp = await lookup(ip);
    const response: ResponseMapper = await this.accountRepository.getItem({
      id: buyer.id,
      email: buyer.email,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      personalIdNumber: buyer.personalIdNumber,
    });

    const { country } = response.item as IAccount;

    if (!country === checkCountryIp.country_name) {
      throw new IpValidatorException();
    }
  }
}

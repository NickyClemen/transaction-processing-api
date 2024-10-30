import { Injectable } from '@nestjs/common';
import { IAccount } from '../../contexts/accounts/domain/account';
import { ITransaction } from '../../contexts/transactions/domain/transaction';
import { IRepository } from '../../shared/domain/interfaces/repository.interface';

@Injectable()
export default class BalanceValidator {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private accountRepository: IRepository,
  ) {}
  async execute(transaction: ITransaction) {
    const { buyer, amount } = transaction;
    const account: IAccount = await this.accountRepository.getItem({
      id: buyer.id,
      email: buyer.email,
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      personalIdNumber: buyer.personalIdNumber,
    });

    return amount <= account.balance.getValue().funds;
  }
}

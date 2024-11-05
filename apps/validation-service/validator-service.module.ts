import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import BalanceValidator from '../../contexts/validation-service/application/balanceValidator.provider';
import CountTransactionsPerPeriod from '../../contexts/validation-service/application/countTransactionsPerPeriod';
import CurrencyValidator from '../../contexts/validation-service/application/currencyValidator.provider';
import IpValidator from '../../contexts/validation-service/application/ipValidator.provider';
import ValidatorBuilder from '../../contexts/validation-service/application/validatorBuilder.provider';
import AccountRepository from 'contexts/accounts/infraestructure/account.repository';
import QueuedTransactionRepository from 'contexts/queue-transactions/infraestructure/queueTransaction.repository';

@Module({
  exports: [ValidatorBuilder],
  providers: [
    ValidatorBuilder,
    IpValidator,
    CurrencyValidator,
    CountTransactionsPerPeriod,
    BalanceValidator,
    {
      provide: AccountRepository.ACCOUNT_REPOSITORY,
      useClass: AccountRepository,
    },
    {
      provide: QueuedTransactionRepository.QUEUED_TRANSACTION_REPOSITORY,
      useClass: QueuedTransactionRepository,
    },
  ],
  imports: [ConfigModule.forRoot({})],
})
export class ValidatorServiceModule {}

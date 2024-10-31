import { Inject, Injectable } from '@nestjs/common';

import { IQueuedTransactionRepository } from '../../../contexts/queue-transactions/domain/queuedTransaction';
import QueuedTransactionRepository from '../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';
import { TransactionMessageBody } from '../../../contexts/transactions/domain/transaction';

import CountTransactionsPerPeriodException from '../domain/exceptions/countTransactionPerPeriod.exception';

@Injectable()
class CountTransactionsPerPeriod {
  static readonly COUNT_TRANSACTION_PER_PERIOD = 'count_transaction_per_period';
  constructor(
    @Inject(QueuedTransactionRepository.QUEUED_TRANSACTION_REPOSITORY)
    private readonly queuedTransactionRepository: IQueuedTransactionRepository,
  ) {}

  async execute(transaction: TransactionMessageBody) {
    const { created_at, buyer } = transaction;
    const historicalTransactions =
      await this.queuedTransactionRepository.queryItems({
        created_at,
        buyer: {
          id: buyer.id,
          email: buyer.email,
          personalIdNumer: buyer.personalIdNumber,
        },
      });

    if (historicalTransactions.items.length > 0) {
      throw new CountTransactionsPerPeriodException();
    }
  }
}

export default CountTransactionsPerPeriod;

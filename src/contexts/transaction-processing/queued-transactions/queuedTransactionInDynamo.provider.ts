import { Inject, Injectable } from '@nestjs/common';
import QueuedTransactionRepository from './queueTransaction.repository';

@Injectable()
export class QueuedTransactionInDynamo {
  constructor(
    @Inject(QueuedTransactionRepository)
    private readonly queuedTransactionRepository: QueuedTransactionRepository,
  ) {}

  async enqueueTransactions(transaction) {
    return await this.queuedTransactionRepository.putItem(transaction);
  }
}

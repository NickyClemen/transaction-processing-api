import { Inject, Injectable } from '@nestjs/common';

import { IRepository } from '../../../shared/repository.interface';
import { CONNECTOR } from '../../../shared/apps/domain/constants';

import { QueuedTransaction } from './queuedTransaction';
import DynanoItem from '../../../shared/providers/aws/domain/valueObjects/dynamoItem';

@Injectable()
export default class QueuedTransactionRepository implements IRepository {
  private readonly table = process.env.QUEUED_TRANSACTIONS_TABLE;
  constructor(@Inject(CONNECTOR) private readonly repository: IRepository) {}

  getItem(input) {
    console.log(input);
  }

  async putItem(input: QueuedTransaction) {
    const putItem = new DynanoItem({
      table: this.table,
      item: { ...input },
    });

    const result = await this.repository.putItem(putItem.valueMapper());

    console.log(result);
  }
}

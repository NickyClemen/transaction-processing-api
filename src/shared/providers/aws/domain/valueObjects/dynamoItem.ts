import { PutItemInput } from '@aws-sdk/client-dynamodb';

import { QueuedTransaction } from '../../../../../contexts/transaction-processing/queued-transactions/queuedTransaction';

import { ValueObject } from '../../../../../shared/apps/domain/valueObjects/valueObject';

export default class DynanoItem extends ValueObject<QueuedTransaction> {
  constructor(readonly value) {
    super(value);
  }

  valueMapper(): PutItemInput {
    const { table, item } = this.value;

    return {
      TableName: table,
      Item: Object.entries(item).reduce((accum, entry) => {
        const [key, value] = entry;
        accum[key] = {
          S: typeof value === 'object' ? JSON.stringify(value) : value,
        };
        return accum;
      }, {}),
    };
  }
}

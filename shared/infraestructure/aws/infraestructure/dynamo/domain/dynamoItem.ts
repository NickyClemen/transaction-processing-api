import { IAccount } from '../../../../../../contexts/accounts/domain/account';
import { ITransaction } from '../../../../../../contexts/transactions/domain/transaction';
import { IQueuedTransaction } from '../../../../../../contexts/queue-transactions/domain/queuedTransaction';

import { ValueObject } from '../../../../../domain/models/valueObject';

type DynamoTypeParams = {
  table: string;
  body: IQueuedTransaction | ITransaction | IAccount;
  dynamoType: 'Key' | 'Item';
};

export default class DynamoItem extends ValueObject<DynamoTypeParams> {
  constructor(readonly value: DynamoTypeParams) {
    super(value);
  }

  valueMapper() {
    const { table, dynamoType, body } = this.value;

    return {
      TableName: table,
      [dynamoType]: Object.entries(body).reduce((accum, entry) => {
        const [key, value] = entry;
        accum[key] = {
          S: typeof value === 'object' ? JSON.stringify(value) : value,
        };

        return accum;
      }, {}),
    };
  }
}

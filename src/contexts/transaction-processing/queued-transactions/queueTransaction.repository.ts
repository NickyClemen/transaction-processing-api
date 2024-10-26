import { Inject, Injectable } from '@nestjs/common';
import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { v4 as uuidv4 } from 'uuid';

import { IRepository } from '../../../shared/repository.interface';
import { CONNECTOR } from '../../../shared/apps/domain/constants';
import DynanoItem from '../../../shared/providers/aws/domain/valueObjects/dynamoItem';
import PutDynamoResponse from '../../../shared/providers/aws/domain/valueObjects/putDynamoResponse';
import { PutItemResponseMapper } from '../../../shared/providers/aws/domain/interfaces/dynamo.interface';

import { QueuedTransaction } from './queuedTransaction';

@Injectable()
export default class QueuedTransactionRepository implements IRepository {
  private readonly table = process.env.QUEUED_TRANSACTIONS_TABLE;
  constructor(@Inject(CONNECTOR) private readonly repository: IRepository) {}

  getItem(input) {
    console.log(input);
  }

  async putItem(input: QueuedTransaction): Promise<PutItemResponseMapper> {
    const putItem = new DynanoItem({
      table: this.table,
      item: { ...input, id: uuidv4() },
    });

    const result: PutItemCommandOutput = await this.repository.putItem(
      putItem.valueMapper(),
    );

    const putDynamoResponse: PutDynamoResponse = new PutDynamoResponse(result);

    return putDynamoResponse.valueMapper();
  }
}

import { Inject, Injectable } from '@nestjs/common';

import {
  GetItemCommandOutput,
  PutItemCommandOutput,
} from '@aws-sdk/client-dynamodb';

import { CONNECTOR } from '../../../shared/domain/constants';
import { IRepository } from '../../../shared/domain/interfaces/repository.interface';

import { ResponseMapper } from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';

import DynanoItem from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/dynamoItem';
import GetDynamoResponse from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/getDynamoResponse';
import PutDynamoResponse from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/putDynamoResponse';

import { QueuedTransaction } from '../domain/queuedTransaction';

@Injectable()
export default class QueuedTransactionRepository implements IRepository {
  private readonly table = process.env.QUEUED_TRANSACTIONS_TABLE;
  constructor(@Inject(CONNECTOR) private readonly repository: IRepository) {}

  async getItem(input): Promise<ResponseMapper> {
    const getItem = new DynanoItem({
      table: this.table,
      dynamoType: 'Key',
      body: { ...input },
    });

    const result: GetItemCommandOutput = await this.repository.getItem(
      getItem.valueMapper(),
    );

    const getDynamoResponse: GetDynamoResponse = new GetDynamoResponse(result);
    return getDynamoResponse.valueMapper();
  }

  async putItem(input: QueuedTransaction): Promise<ResponseMapper> {
    const putItem = new DynanoItem({
      table: this.table,
      dynamoType: 'Item',
      body: { ...input },
    });

    const result: PutItemCommandOutput = await this.repository.putItem(
      putItem.valueMapper(),
    );

    const putDynamoResponse: PutDynamoResponse = new PutDynamoResponse(result);
    return putDynamoResponse.valueMapper();
  }
}

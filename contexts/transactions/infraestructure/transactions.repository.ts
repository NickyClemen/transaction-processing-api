import { Inject, Injectable } from '@nestjs/common';
import {
  GetItemCommandOutput,
  PutItemCommandOutput,
} from '@aws-sdk/client-dynamodb';

import { v4 as uuidv4 } from 'uuid';

import { CONNECTOR } from '../../../shared/domain/constants';
import { IRepository } from '../../../shared/domain/interfaces/repository.interface';

import { ResponseMapper } from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';
import GetDynamoResponse from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/getDynamoResponse';
import PutDynamoResponse from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/putDynamoResponse';
import DynamoItem from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/dynamoItem';

import { ITransaction, ITransactionRepository } from '../domain/transaction';

@Injectable()
export default class TransactionRepository implements ITransactionRepository {
  static readonly TRANSACTION_REPOSITORY: string = 'TRANSACTION_REPOSITORY';
  private readonly table = process.env.TRANSACTION_REPOSITORY;
  constructor(@Inject(CONNECTOR) private readonly repository: IRepository) {}

  async getItem(input): Promise<ResponseMapper> {
    const getItem = new DynamoItem({
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

  async putItem(input: ITransaction): Promise<ResponseMapper> {
    const putItem = new DynamoItem({
      table: this.table,
      dynamoType: 'Item',
      body: { ...input, id: uuidv4() },
    });

    const result: PutItemCommandOutput = await this.repository.putItem(
      putItem.valueMapper(),
    );

    const putDynamoResponse: PutDynamoResponse = new PutDynamoResponse(result);
    return putDynamoResponse.valueMapper();
  }
}

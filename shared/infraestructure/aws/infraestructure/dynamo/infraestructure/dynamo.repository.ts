import { Injectable } from '@nestjs/common';

import {
  DynamoDBClient,
  DynamoDBServiceException,
  GetItemCommand,
  GetItemCommandOutput,
  // GetItemInput,
  PutItemCommand,
  PutItemCommandOutput,
  // PutItemInput,
} from '@aws-sdk/client-dynamodb';

import { CONNECTOR } from '../../../../../domain/constants';
import { IRepository } from '../../../../../domain/interfaces/repository.interface';
import AwsClientException from '../../../domain/exceptions/awsClient.exceptions';
import DynamoClientException from '../domain/exceptions/dynamoClient.exceptions';

@Injectable()
export default class DynamoRepository implements IRepository {
  private readonly dynamoDbClient: DynamoDBClient;
  constructor() {
    this.dynamoDbClient = new DynamoDBClient({
      region: process.env.REGION,
      endpoint: `http://${process.env.LOCALSTACK_URL}`,
    });
  }

  async getItem(input): Promise<GetItemCommandOutput> {
    try {
      const dynamoCommand = new GetItemCommand(input);
      return await this.dynamoDbClient.send(dynamoCommand);
    } catch (error) {
      if (error instanceof DynamoDBServiceException) {
        throw new DynamoClientException(error);
      }

      throw new AwsClientException(error);
    }
  }

  async putItem(input): Promise<PutItemCommandOutput> {
    try {
      const command: PutItemCommand = new PutItemCommand(input);
      return await this.dynamoDbClient.send(command);
    } catch (error) {
      if (error instanceof DynamoDBServiceException) {
        throw new DynamoClientException(error);
      }

      throw new AwsClientException(error);
    }
  }
}

export const dynamoConnector = {
  provide: CONNECTOR,
  useClass: DynamoRepository,
};

import { Injectable } from '@nestjs/common';

import {
  DynamoDBClient,
  DynamoDBServiceException,
  GetItemCommand,
  // GetItemInput,
  PutItemCommand,
  PutItemCommandOutput,
  // PutItemInput,
} from '@aws-sdk/client-dynamodb';

import { IRepository } from '../../../repository.interface';
import AwsClientException from '../domain/exceptions/awsClient.exceptions';
import DynamoClientException from '../domain/exceptions/dynamoClient.exceptions';

@Injectable()
export default class DynamoRepository implements IRepository {
  private readonly dynamoDbClient: DynamoDBClient;
  constructor() {
    this.dynamoDbClient = new DynamoDBClient({
      region: process.env.REGION,
      endpoint: `http://${process.env.SQS_QUEUE_URL}`,
    });
  }

  async getItem(input) {
    try {
      const dynamoCommand = new GetItemCommand({
        TableName: input.table,
        Key: { ...input.Key },
      });

      return await this.dynamoDbClient.send(dynamoCommand);
    } catch (error) {
      console.log(error);
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

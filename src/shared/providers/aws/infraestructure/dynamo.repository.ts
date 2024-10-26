import { Injectable } from '@nestjs/common';

import {
  DynamoDBClient,
  DynamoDBServiceException,
  GetItemCommand,
  // GetItemInput,
  PutItemCommand,
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

  async putItem(input) {
    try {
      const command: PutItemCommand = new PutItemCommand({
        TableName: input.table,
        Item: { ...input.item },
      });

      return await this.dynamoDbClient.send(command);
    } catch (error) {
      if (error instanceof DynamoDBServiceException) {
        console.log(error);
        throw new DynamoClientException(error);
      }

      throw new AwsClientException(error);
    }
  }
}

import { SQSClient } from '@aws-sdk/client-sqs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const SQS_CLIENT = 'SQS_CLIENT';
export const DYNAMODB_CLIENT = 'DYNAMODB_CLIENT';

export const sqsProviders = {
  provide: SQS_CLIENT,
  useFactory: async (): Promise<SQSClient> => {
    return new SQSClient({
      region: process.env.REGION,
    });
  },
};

export const dynamoDbProviders = {
  provide: DYNAMODB_CLIENT,
  useFactory: async (): Promise<DynamoDBClient> => {
    return new DynamoDBClient({
      region: process.env.REGION,
    });
  },
};

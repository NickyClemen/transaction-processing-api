import { SQSClient } from '@aws-sdk/client-sqs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const SQS_CLIENT = 'SQS_CLIENT';
const DYNAMODB_CLIENT = 'DYNAMODB_CLIENT';

const sqsProviders = {
  provide: SQS_CLIENT,
  useFactory: async (): Promise<SQSClient> => {
    return new SQSClient({
      region: process.env.REGION,
    });
  },
};

const dynamoProviders = {
  provide: DYNAMODB_CLIENT,
  useFactory: async (): Promise<DynamoDBClient> => {
    return new DynamoDBClient({
      region: process.env.REGION,
    });
  },
};

export { SQS_CLIENT, DYNAMODB_CLIENT, sqsProviders, dynamoProviders };

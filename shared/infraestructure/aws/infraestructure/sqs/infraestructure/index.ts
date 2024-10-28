import { SQSClient } from '@aws-sdk/client-sqs';

const SQS_CLIENT = 'SQS_CLIENT';
const SqsProvide = {
  provide: SQS_CLIENT,
  useFactory: async (): Promise<SQSClient> => {
    return new SQSClient({
      region: process.env.REGION,
    });
  },
};

export { SqsProvide, SQS_CLIENT };

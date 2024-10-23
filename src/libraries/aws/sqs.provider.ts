import { Inject, Injectable } from '@nestjs/common';

import {
  SQSClient,
  SQSServiceException,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';

import { SQS_CLIENT } from './awsClients.provider';
import AwsClientException from './awsClient.exception';
import SqsClientException from './sqsClient.exception';

@Injectable()
export default class SqsProvider {
  constructor(@Inject(SQS_CLIENT) private readonly sqsClient: SQSClient) {}

  async sendMessage(messageBody) {
    try {
      const { REGION, SQS_QUEUE_URL, SQS_QUEUE_NAME } = process.env;
      const sqsCommand = new SendMessageCommand({
        QueueUrl: `http://sqs.${REGION}.${SQS_QUEUE_URL}/000000000000/${SQS_QUEUE_NAME}`,
        MessageBody: JSON.stringify(messageBody),
      });

      return await this.sqsClient.send(sqsCommand);
    } catch (error: unknown) {
      if (error instanceof SQSServiceException) {
        throw new SqsClientException(error);
      }

      throw new AwsClientException(error);
    }
  }
}

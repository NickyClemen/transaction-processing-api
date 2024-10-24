import { Inject, Injectable } from '@nestjs/common';

import {
  SQSClient,
  SQSServiceException,
  SendMessageCommand,
  ReceiveMessageCommand,
} from '@aws-sdk/client-sqs';

import SqsClientException from '../domain/exceptions/sqsClient.exception';
import AwsClientException from '../domain/exceptions/awsClient.exception';

import { SQS_CLIENT } from '../infraestructure/awsClients.provider';

@Injectable()
export default class SqsProvider {
  constructor(@Inject(SQS_CLIENT) private readonly sqsClient: SQSClient) {}

  async sendMessage(messageBody) {
    try {
      const { REGION, SQS_QUEUE_URL, SQS_QUEUE_NAME } = process.env;
      const sqsCommand = new SendMessageCommand({
        // TODO. pass the queue url assembly to the useFactory of the environment variables
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

  async receiveMessage() {
    try {
      const { REGION, SQS_QUEUE_URL, SQS_QUEUE_NAME } = process.env;
      const sqsCommand = new ReceiveMessageCommand({
        // TODO. pass the queue url assembly to the useFactory of the environment variables
        QueueUrl: `http://sqs.${REGION}.${SQS_QUEUE_URL}/000000000000/${SQS_QUEUE_NAME}`,
        MaxNumberOfMessages: 10,
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

import { Inject, Injectable } from '@nestjs/common';

import {
  SQSClient,
  SQSServiceException,
  SendMessageCommand,
  ReceiveMessageCommand,
  SendMessageCommandOutput,
  ReceiveMessageCommandOutput,
  DeleteMessageCommandOutput,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';

import SqsClientException from '../domain/exceptions/sqsClient.exception';
import AwsClientException from '../../../domain/exceptions/awsClient.exceptions';

import { SQS_CLIENT } from '../infraestructure';

@Injectable()
export default class SqsProvider {
  constructor(@Inject(SQS_CLIENT) private readonly sqsClient: SQSClient) {}

  async sendMessage(messageBody): Promise<SendMessageCommandOutput> {
    try {
      const { REGION, LOCALSTACK_URL, SQS_QUEUE_NAME } = process.env;
      const sqsCommand = new SendMessageCommand({
        // TODO. pass the queue url assembly to the useFactory of the environment variables
        QueueUrl: `http://sqs.${REGION}.${LOCALSTACK_URL}/000000000000/${SQS_QUEUE_NAME}`,
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

  async receiveMessage(): Promise<ReceiveMessageCommandOutput> {
    try {
      const { REGION, LOCALSTACK_URL, SQS_QUEUE_NAME } = process.env;
      const sqsCommand = new ReceiveMessageCommand({
        // TODO. pass the queue url assembly to the useFactory of the environment variables
        QueueUrl: `http://sqs.${REGION}.${LOCALSTACK_URL}/000000000000/${SQS_QUEUE_NAME}`,
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

  async deleteMessage(
    receiptHandle: string,
  ): Promise<DeleteMessageCommandOutput> {
    try {
      const { REGION, LOCALSTACK_URL, SQS_QUEUE_NAME } = process.env;
      const sqsCommand = new DeleteMessageCommand({
        // TODO. pass the queue url assembly to the useFactory of the environment variables
        QueueUrl: `http://sqs.${REGION}.${LOCALSTACK_URL}/000000000000/${SQS_QUEUE_NAME}`,
        ReceiptHandle: receiptHandle,
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

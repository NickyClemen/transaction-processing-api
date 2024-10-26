import { Inject, Injectable } from '@nestjs/common';
import { SendMessageCommandOutput } from '@aws-sdk/client-sqs';

import SqsProvider from '../infraestructure/sqs.provider';
import SqsMessage from '../domain/valueObjects/sqsMessage';

import { SendMessageResponseMapper } from '../domain/interfaces/sqs.interface';
@Injectable()
export default class SendMessageToSqs<T> {
  constructor(@Inject(SqsProvider) private readonly sqsProvider: SqsProvider) {}

  async execute(messageBody: T): Promise<SendMessageResponseMapper> {
    const response: SendMessageCommandOutput =
      await this.sqsProvider.sendMessage(messageBody);

    const sqsMessage: SqsMessage = new SqsMessage(response);
    return sqsMessage.valueMapper();
  }
}

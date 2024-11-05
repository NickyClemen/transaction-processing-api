import { Inject, Injectable } from '@nestjs/common';
import { SendMessageCommandOutput } from '@aws-sdk/client-sqs';

import SqsProvider from '../application/sqs.provider';
import SqsMessage from '../domain/models/sqsMessage';

import { SendMessageResponseMapper } from '../domain/interfaces/sqs.interface';

@Injectable()
export default class SendMessage {
  constructor(@Inject(SqsProvider) private readonly sqsProvider: SqsProvider) {}

  async execute(messageBody): Promise<SendMessageResponseMapper> {
    const response: SendMessageCommandOutput =
      await this.sqsProvider.sendMessage(messageBody);

    const sqsMessage: SqsMessage = new SqsMessage(response);
    return sqsMessage.valueMapper();
  }
}

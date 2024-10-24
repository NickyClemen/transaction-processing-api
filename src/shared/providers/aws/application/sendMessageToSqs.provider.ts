import { Inject, Injectable } from '@nestjs/common';

import SqsProvider from './sqs.provider';
@Injectable()
export default class SendMessageToSqs<T> {
  constructor(@Inject(SqsProvider) private readonly sqsProvider: SqsProvider) {}

  async execute(messageBody: T): Promise<unknown> {
    return await this.sqsProvider.sendMessage(messageBody);
  }
}

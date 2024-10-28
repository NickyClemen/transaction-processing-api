import { Inject, Injectable } from '@nestjs/common';

import { ReceiveMessageCommandOutput } from '@aws-sdk/client-sqs';

import SqsMessageList from '../domain/models/sqsMessageList';
import { ReceiveMessagesOutput } from '../domain/interfaces/receiveMessagesOutput';

import SqsProvider from './sqs.provider';

@Injectable()
export default class ReceiveMessage {
  constructor(@Inject(SqsProvider) private readonly sqsProvider: SqsProvider) {}

  async receiveMessages(): Promise<ReceiveMessagesOutput> {
    const response: ReceiveMessageCommandOutput =
      await this.sqsProvider.receiveMessage();

    const sqsMessageList: SqsMessageList = new SqsMessageList(response);
    return sqsMessageList.valueMapper();
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { ReceiveMessageCommandOutput } from '@aws-sdk/client-sqs';

import SqsMessageList from '../domain/receiveMessages';

import SqsProvider from './sqs.provider';

@Injectable()
export default class ReceiveMessageFromSqs {
  constructor(@Inject(SqsProvider) private readonly sqsProvider: SqsProvider) {}

  async receiveMessages(): Promise<object> {
    const response: ReceiveMessageCommandOutput =
      await this.sqsProvider.receiveMessage();

    const sqsMessageList: SqsMessageList = new SqsMessageList(response);
    return sqsMessageList.valueMapper();
  }
}

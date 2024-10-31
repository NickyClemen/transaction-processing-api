import { Inject, Injectable } from '@nestjs/common';

import { DeleteMessageCommandOutput } from '@aws-sdk/client-sqs';

import SqsMessageList from '../domain/models/sqsMessageList';
import { ReceiveMessagesOutput } from '../domain/interfaces/receiveMessagesOutput';

import SqsProvider from './sqs.provider';

@Injectable()
export default class DeleteMessage {
  constructor(@Inject(SqsProvider) private readonly sqsProvider: SqsProvider) {}

  async deleteMessage(receiptHandle: string): Promise<ReceiveMessagesOutput> {
    const response: DeleteMessageCommandOutput =
      await this.sqsProvider.deleteMessage(receiptHandle);

    const sqsMessageList: SqsMessageList = new SqsMessageList(response);
    return sqsMessageList.valueMapper();
  }
}

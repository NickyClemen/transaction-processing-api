import { ReceiveMessageCommandOutput } from '@aws-sdk/client-sqs';

import { ValueObject } from '../../../../../../domain/models/valueObject';

import { Message } from '../types/message';
import { ReceiveMessagesOutput } from '../interfaces/receiveMessagesOutput';

export default class SqsMessageList extends ValueObject<ReceiveMessageCommandOutput> {
  constructor(readonly value: ReceiveMessageCommandOutput) {
    super(value);
  }

  valueMapper(): ReceiveMessagesOutput {
    const { $metadata, Messages = [] } = this.value;

    return {
      status: $metadata.httpStatusCode,
      requestId: $metadata.requestId,
      messages: Messages.map((message: Message) => {
        const { Body, MessageId } = message;
        return {
          body: JSON.parse(Body),
          id: MessageId,
        };
      }),
    } as ReceiveMessagesOutput;
  }
}

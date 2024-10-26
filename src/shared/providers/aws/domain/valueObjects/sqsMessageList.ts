import { ReceiveMessageCommandOutput } from '@aws-sdk/client-sqs';

import { ValueObject } from '../../../../../shared/apps/domain/valueObjects/valueObject';

type Message = {
  Body: string;
  MD5OfBody: string;
  MessageId: string;
  ReceiptHandle: string;
};

export default class SqsMessageList extends ValueObject<ReceiveMessageCommandOutput> {
  constructor(readonly value: ReceiveMessageCommandOutput) {
    super(value);
  }

  valueMapper() {
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
    };
  }
}

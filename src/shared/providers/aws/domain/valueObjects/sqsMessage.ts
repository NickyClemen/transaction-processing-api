import { SendMessageCommandOutput } from '@aws-sdk/client-sqs';

import { ValueObject } from '../../../../../shared/apps/domain/valueObjects/valueObject';

import { SendMessageResponseMapper } from '../interfaces/sqs.interface';

export default class SqsMessage extends ValueObject<SendMessageCommandOutput> {
  constructor(readonly value: SendMessageCommandOutput) {
    super(value);
  }

  valueMapper(): SendMessageResponseMapper {
    const { $metadata, MessageId, MD5OfMessageBody } = this.value;

    return {
      status: $metadata.httpStatusCode,
      requestId: $metadata.requestId,
      messageId: MessageId,
      md5OfMessageBody: MD5OfMessageBody,
    };
  }
}

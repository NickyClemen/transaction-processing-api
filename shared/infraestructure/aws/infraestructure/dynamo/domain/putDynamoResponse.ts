import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { ValueObject } from '../../../../../domain/models/valueObject';

import { ResponseMapper } from './interfaces/responseMapper.interface';

export default class PutDynamoResponse extends ValueObject<PutItemCommandOutput> {
  constructor(readonly value: PutItemCommandOutput) {
    super(value);
  }

  valueMapper(): ResponseMapper {
    const { $metadata } = this.value;

    return {
      status: $metadata.httpStatusCode,
      requestId: $metadata.requestId,
    };
  }
}

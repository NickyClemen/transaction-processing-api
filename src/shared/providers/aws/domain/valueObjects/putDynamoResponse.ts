import { PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { ValueObject } from '../../../../../shared/apps/domain/valueObjects/valueObject';

import { PutItemResponseMapper } from '../interfaces/dynamo.interface';

export default class PutDynamoResponse extends ValueObject<PutItemCommandOutput> {
  constructor(readonly value: PutItemCommandOutput) {
    super(value);
  }

  valueMapper(): PutItemResponseMapper {
    const { $metadata } = this.value;

    return {
      status: $metadata.httpStatusCode,
      requestId: $metadata.requestId,
    };
  }
}

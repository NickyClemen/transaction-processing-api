import { GetItemCommandOutput } from '@aws-sdk/client-dynamodb';

import { ValueObject } from '../../../../../domain/models/valueObject';

import { ResponseMapper } from './interfaces/responseMapper.interface';

export default class GetDynamoResponse extends ValueObject<GetItemCommandOutput> {
  constructor(readonly value: GetItemCommandOutput) {
    super(value);
  }

  valueMapper(): ResponseMapper {
    const { $metadata, Item } = this.value;

    return {
      status: $metadata.httpStatusCode,
      requestId: $metadata.requestId,
      item: Object.entries(Item).reduce((accum, entry) => {
        const [key, value] = entry;
        accum[key] = key === 'buyer' ? JSON.parse(value.S) : value.S;
        return accum;
      }, {}),
    };
  }
}

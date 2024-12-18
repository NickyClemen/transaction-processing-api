import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb';

import errorCodes from '../../../exceptions/errorCodes';

export default class DynamoClientException extends Error {
  constructor(private readonly error: DynamoDBServiceException) {
    super();
  }

  getError() {
    const { name, message, $metadata, $response } = this.error;

    return {
      type: name,
      message,
      statusName: errorCodes[name],
      metadata: { ...$metadata },
      response: $response,
    };
  }
}

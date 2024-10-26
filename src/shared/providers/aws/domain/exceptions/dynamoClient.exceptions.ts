import errorCodes from './errorCodes';

export default class DynamoClientException extends Error {
  constructor(private readonly error) {
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

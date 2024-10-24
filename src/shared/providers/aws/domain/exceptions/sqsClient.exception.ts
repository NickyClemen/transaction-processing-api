import errorCodes from './errorCodes';

export default class SqsClientException extends Error {
  constructor(private readonly error) {
    super();
  }

  getError() {
    const { name, message, $metadata } = this.error;

    return {
      type: name,
      message,
      statusName: errorCodes[name],
      metadata: { ...$metadata },
    };
  }
}

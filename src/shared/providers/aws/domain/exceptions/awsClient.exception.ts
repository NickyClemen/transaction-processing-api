import errorCodes from './errorCodes';

export default class AwsClientException extends Error {
  constructor(private readonly error) {
    super();
  }

  getError() {
    const { name, message } = this.error;
    return {
      type: name,
      message,
      statusName: errorCodes[name],
    };
  }
}

class IpValidatorException extends Error {
  constructor(
    readonly name: string = 'IpValidatorException',
    readonly message: string = 'ip out of range',
  ) {
    super(name);
  }
}

export default IpValidatorException;

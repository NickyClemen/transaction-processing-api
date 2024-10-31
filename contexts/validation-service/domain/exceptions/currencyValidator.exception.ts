class CurrencyValidatorException extends Error {
  constructor(
    readonly name: string = 'CurrencyValidatorException',
    readonly message: string = 'currency not supported',
  ) {
    super(name);
  }
}

export default CurrencyValidatorException;

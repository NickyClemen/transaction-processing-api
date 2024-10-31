class BalanceValidatorException extends Error {
  constructor(
    readonly name: string = 'BalanceValidatorException',
    readonly message: string = 'insufficient funds',
  ) {
    super(name);
  }
}

export default BalanceValidatorException;

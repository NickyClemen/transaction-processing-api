class CountTransactionsPerPeriodException extends Error {
  constructor(
    readonly name: string = 'CountTransactionsPerPeriodException',
    readonly message: string = 'transactions duplicates',
  ) {
    super(name);
  }
}

export default CountTransactionsPerPeriodException;

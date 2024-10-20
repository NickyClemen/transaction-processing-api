export default interface Transaction {
  transactionId: string;
  paymentMethod: string;
  accountId: string;
  transactionCreateTime: Date;
  transactionUpdateTime?: Date;
  transactionStatus: string;
  amount: number;
  currency: string;
}

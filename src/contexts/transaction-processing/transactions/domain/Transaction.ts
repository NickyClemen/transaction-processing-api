import IBuyer from '../../shared/domain/buyer';

type TransactionType = 'FUNDS_IN_ACCOUNT';
type TransactionMessageBody = Omit<ITransaction, 'id'>;
const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

interface ITransaction {
  id: string;
  externalId: string;
  ip: string;
  buyer: IBuyer;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  type: TransactionType;
}

interface TransactionRepository {
  putItem();
  getItem();
}

export {
  ITransaction,
  TransactionRepository,
  TransactionMessageBody,
  TRANSACTION_REPOSITORY,
  TransactionType,
};

import IBuyer from '../../../shared/domain/interfaces/buyer';
import { IRepository } from 'shared/domain/interfaces/repository.interface';
import { ResponseMapper } from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';

type TransactionType = 'FUNDS_IN_ACCOUNT';
type TransactionMessageBody = Omit<ITransaction, 'id'>;
const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

interface ITransaction {
  id: string;
  created_at: number;
  updated_at?: number;
  externalId: string;
  ip: string;
  buyer: IBuyer;
  name: string;
  description?: string;
  status?: string;
  amount: number;
  currency: string;
  type: TransactionType;
}

interface ITransactionRepository extends IRepository {
  getItem(input): Promise<ResponseMapper>;
  putItem(input): Promise<ResponseMapper>;
}

export {
  ITransaction,
  ITransactionRepository,
  TransactionMessageBody,
  TRANSACTION_REPOSITORY,
  TransactionType,
};

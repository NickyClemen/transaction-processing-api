import { IAccount } from '../../../../../../../contexts/accounts/domain/account';
import { IQueuedTransaction } from '../../../../../../../contexts/queue-transactions/domain/queuedTransaction';
import { ITransaction } from '../../../../../../../contexts/transactions/domain/transaction';

interface ResponseMapper {
  status: number;
  requestId: string;
  item?: ITransaction | IAccount | IQueuedTransaction;
}

export { ResponseMapper };

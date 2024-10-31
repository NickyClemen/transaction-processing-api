import { TransactionMessageBody } from '../../transactions/domain/transaction';

import { IRepository } from '../../../shared/domain/interfaces/repository.interface';
import { ResponseMapper } from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';

interface IQueuedTransaction extends TransactionMessageBody {
  messageId: string;
  md5OfMessageBody: string;
}

interface IQueuedTransactionRepository extends IRepository {
  getItem(input): Promise<ResponseMapper>;
  putItem(input): Promise<ResponseMapper>;
  queryItems(input);
}

export { IQueuedTransactionRepository, IQueuedTransaction };

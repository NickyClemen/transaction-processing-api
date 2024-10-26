import { ITransaction } from '../transactions/domain/Transaction';

export interface QueuedTransaction extends Omit<ITransaction, 'id'> {
  messageId: string;
  md5OfMessageBody: string;
}

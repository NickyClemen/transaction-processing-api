import QueuedTransactionRepository from '../../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';
import AccountRepository from '../../../../contexts/accounts/infraestructure/account.repository';
import TransactionRepository from '../../../../contexts/transactions/infraestructure/transactions.repository';

import { transactionCompleteMock } from './transaction.mock';
import accountMock from './account.mock';
import queuedTransactionsMock from './queued-transactions.mock';

const queuedTransactionRepository = {
  provide: QueuedTransactionRepository.QUEUED_TRANSACTION_REPOSITORY,
  useValue: {
    getItem: async () => ({
      status: 200,
      requestId: '1',
      item: queuedTransactionsMock[0],
    }),
    queryItems: async () => ({
      status: 200,
      requestId: '1',
      items: [],
    }),
  },
};

const accountRepository = {
  provide: AccountRepository.ACCOUNT_REPOSITORY,
  useValue: {
    getItem: async () => ({
      status: 200,
      requestId: '1',
      item: accountMock,
    }),
  },
};

const transactionRepository = {
  provide: TransactionRepository.TRANSACTION_REPOSITORY,
  useValue: {
    getItem: async () => ({
      status: 200,
      requestId: '1',
      item: transactionCompleteMock,
    }),
  },
};

export {
  transactionRepository,
  accountRepository,
  queuedTransactionRepository,
};

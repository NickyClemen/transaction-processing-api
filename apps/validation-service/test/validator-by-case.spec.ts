import { TestingModule } from '@nestjs/testing';

import { TransactionMessageBody } from '../../../contexts/transactions/domain/transaction';
import ValidatorBuilder from '../../../contexts/validation-service/application/validatorBuilder.provider';

import ModuleBuilder from './__mocks__/moduleBuilder.mock';
import { validationServiceMetadata } from './__mocks__/validation-service.module.mock';
import { transactionMock } from './__mocks__/transaction.mock';
import queuedTransactionsMock from './__mocks__/queued-transactions.mock';

import {
  queuedTransactionRepository,
  accountRepository,
  transactionRepository,
} from './__mocks__/providers.mock';
import accountMock from './__mocks__/account.mock';

describe('', () => {
  let moduleFixture: TestingModule;
  let validationBuilder: ValidatorBuilder;
  let moduleBuilder: ModuleBuilder;

  test('count transactions validator', async () => {
    const queuedTrxRepository = {
      ...queuedTransactionRepository,
      useValue: {
        ...queuedTransactionRepository.useValue,
        queryItems: async () => ({
          status: 200,
          requestId: '1',
          items: queuedTransactionsMock,
        }),
      },
    };

    moduleBuilder = new ModuleBuilder({
      ...validationServiceMetadata,
      providers: [
        ...validationServiceMetadata.providers,
        queuedTrxRepository,
        accountRepository,
        transactionRepository,
      ],
    });

    moduleFixture = await moduleBuilder.moduleBuilder();
    validationBuilder = moduleFixture.get<ValidatorBuilder>(ValidatorBuilder);

    const result = validationBuilder.execute(
      transactionMock as TransactionMessageBody,
    );

    await expect(result).rejects.toThrow('transactions duplicates');
  });

  test('balance validator', async () => {
    const accRepository = {
      ...accountRepository,
      useValue: {
        ...accountRepository.useValue,
        getItem: async () => ({
          status: 200,
          requestId: '1',
          item: {
            ...accountMock,
            balance: {
              ...accountMock.balance,
              funds: 50,
            },
          },
        }),
      },
    };

    moduleBuilder = new ModuleBuilder({
      ...validationServiceMetadata,
      providers: [
        ...validationServiceMetadata.providers,
        queuedTransactionRepository,
        accRepository,
        transactionRepository,
      ],
    });

    moduleFixture = await moduleBuilder.moduleBuilder();
    validationBuilder = moduleFixture.get<ValidatorBuilder>(ValidatorBuilder);

    const result = validationBuilder.execute(
      transactionMock as TransactionMessageBody,
    );

    await expect(result).rejects.toThrow('insufficient funds');
  });

  test('currency validator error', async () => {
    const accRepository = {
      ...accountRepository,
      useValue: {
        ...accountRepository.useValue,
        getItem: async () => ({
          status: 200,
          requestId: '1',
          item: {
            ...accountMock,
            balance: {
              ...accountMock.balance,
              currency: 'USD',
            },
          },
        }),
      },
    };

    moduleBuilder = new ModuleBuilder({
      ...validationServiceMetadata,
      providers: [
        ...validationServiceMetadata.providers,
        queuedTransactionRepository,
        accRepository,
        transactionRepository,
      ],
    });

    moduleFixture = await moduleBuilder.moduleBuilder();
    validationBuilder = moduleFixture.get<ValidatorBuilder>(ValidatorBuilder);

    const result = validationBuilder.execute(
      transactionMock as TransactionMessageBody,
    );

    await expect(result).rejects.toThrow('currency not supported');
  });
});

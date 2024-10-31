import { TestingModule } from '@nestjs/testing';

import { TransactionMessageBody } from '../../../contexts/transactions/domain/transaction';
import ValidatorBuilder from '../../../contexts/validation-service/application/validatorBuilder.provider';

import ModuleBuilder from './__mocks__/moduleBuilder.mock';
import { validationServiceMetadata } from './__mocks__/validation-service.module.mock';
import { transactionMock } from './__mocks__/transaction.mock';

import {
  queuedTransactionRepository,
  accountRepository,
  transactionRepository,
} from './__mocks__/providers.mock';

describe('', () => {
  let moduleFixture: TestingModule;
  let validationBuilder: ValidatorBuilder;
  const moduleBuilder: ModuleBuilder = new ModuleBuilder({
    ...validationServiceMetadata,
    providers: [
      ...validationServiceMetadata.providers,
      queuedTransactionRepository,
      accountRepository,
      transactionRepository,
    ],
  });

  beforeEach(async () => {
    moduleFixture = await moduleBuilder.moduleBuilder();
    validationBuilder = moduleFixture.get<ValidatorBuilder>(ValidatorBuilder);
  });

  test('', async () => {
    const validationBuilderSpy = jest.spyOn(validationBuilder, 'execute');
    await validationBuilder.execute(transactionMock as TransactionMessageBody);

    expect(typeof validationBuilder.execute).toBe('function');
    expect(validationBuilder).toBeInstanceOf(ValidatorBuilder);
    expect(validationBuilderSpy).toHaveBeenCalled();
    expect(validationBuilderSpy.mock.calls[0][0]).toBeDefined();
  });

  test('', async () => {
    const validationBuilderSpy = jest.spyOn(validationBuilder, 'execute');
    await validationBuilder.execute(transactionMock as TransactionMessageBody);

    expect(typeof validationBuilder.execute).toBe('function');
    expect(validationBuilder).toBeInstanceOf(ValidatorBuilder);
    expect(validationBuilderSpy).toHaveBeenCalled();
    expect(validationBuilderSpy.mock.calls[0][0]).toBeDefined();
  });
});

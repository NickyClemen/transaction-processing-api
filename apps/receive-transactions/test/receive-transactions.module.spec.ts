import { TestingModule } from '@nestjs/testing';

import { HandlerParameters } from '../src/domain';
import ReceiveMessagesFromSqs from '../src/application/receiveMessagesFromSqs.provider';

import ModuleBuilder from './__mock__/moduleBuilder.mock';
import sqsEventMock from './__mock__/sqs.event.mock';

import { receiveTransactionsMetadata } from './__mock__/receive-transactions.module.mock';

const moduleBuilder: ModuleBuilder = new ModuleBuilder(
  receiveTransactionsMetadata,
);

describe('', () => {
  let moduleFixture: TestingModule;
  let receiveMessagesFromSqs: ReceiveMessagesFromSqs;

  beforeEach(async () => {
    moduleFixture = await moduleBuilder.moduleBuilder();
    receiveMessagesFromSqs = moduleFixture.get<ReceiveMessagesFromSqs>(
      ReceiveMessagesFromSqs,
    );
  });

  test('', async () => {
    const receiveMessagesFromSqsSpy = jest.spyOn(
      receiveMessagesFromSqs,
      'execute',
    );

    await receiveMessagesFromSqs.execute({
      event: sqsEventMock,
    } as HandlerParameters);

    expect(typeof receiveMessagesFromSqs.execute).toBe('function');
    expect(receiveMessagesFromSqs).toBeInstanceOf(ReceiveMessagesFromSqs);

    expect(receiveMessagesFromSqsSpy).toHaveBeenCalled();
    expect(
      receiveMessagesFromSqsSpy.mock.calls[0][0].event.Records,
    ).toBeDefined();
  });
});

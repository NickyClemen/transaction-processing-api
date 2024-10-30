import { NestFactory } from '@nestjs/core';

import { SQSEvent, Context, SQSHandler } from 'aws-lambda';

import { ReceiveTransactionsModule } from './receive-transactions.module';
import ReceiveMessagesFromSqs from './application/receiveMessagesFromSqs.provider';

export const handler: SQSHandler = async (
  event: SQSEvent,
  context: Context,
) => {
  const appContext = await NestFactory.createApplicationContext(
    ReceiveTransactionsModule,
  );

  const receiveTransactionsFromSqs = appContext.get(ReceiveMessagesFromSqs);
  return await receiveTransactionsFromSqs.execute({ event, context });
};

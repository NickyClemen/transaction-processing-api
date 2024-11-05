import express from '@codegenie/serverless-express';

import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import { QueuedTransactionModule } from './queued-transactions.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const nestInstance = await NestFactory.create(QueuedTransactionModule);
  await nestInstance.init();

  const app = nestInstance.getHttpAdapter().getInstance();
  return express({ app: app });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

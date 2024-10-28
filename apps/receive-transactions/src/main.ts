import { NestFactory } from '@nestjs/core';

import serverlessExpress from '@codegenie/serverless-express';

import { SQSEvent, Context, SQSHandler, Handler, Callback } from 'aws-lambda';

import { ReceiveTransactionsModule } from './receive-transactions.module';

let server: Handler;

export const handler: SQSHandler = async (
  event: SQSEvent,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

async function bootstrap(): Promise<SQSHandler> {
  const app = await NestFactory.create(ReceiveTransactionsModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

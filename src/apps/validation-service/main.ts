import { NestFactory } from '@nestjs/core';

import serverlessExpress from '@codegenie/serverless-express';

import { Callback, Context, Handler } from 'aws-lambda';

import { ValidationService } from './validation-service.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(ValidationService);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: unknown,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

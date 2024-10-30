import { SQSEvent, Context } from 'aws-lambda';

interface HandlerParameters {
  event: SQSEvent;
  context?: Context;
}

export { HandlerParameters };

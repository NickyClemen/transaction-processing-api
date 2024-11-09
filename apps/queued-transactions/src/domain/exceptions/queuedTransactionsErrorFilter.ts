import {
  Catch,
  HttpStatus,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';

import { Response } from 'express';

import AwsClientException from '../../../../../shared/infraestructure/aws/domain/exceptions/awsClient.exceptions';
import DynamoClientException from '../../../../../shared/infraestructure/aws/infraestructure/dynamo/domain/exceptions/dynamoClient.exceptions';
import SqsClientException from '../../../../../shared/infraestructure/aws/infraestructure/sqs/domain/exceptions/sqsClient.exception';

type CustomError =
  | AwsClientException
  | DynamoClientException
  | SqsClientException;
type CustomErrorType =
  | typeof AwsClientException
  | typeof DynamoClientException
  | typeof SqsClientException;

@Catch()
export default class QueuedTransactionsErrorFilter implements ExceptionFilter {
  private readonly exceptionsMap = [
    AwsClientException,
    DynamoClientException,
    SqsClientException,
  ];

  catch(exception: Error | CustomError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const statusCode: number = this.setStatusCode(exception);

    response.status(statusCode).json({
      statusCode,
      message: exception.message,
    });
  }

  private isInstanceOf(exception: unknown): boolean {
    return this.exceptionsMap.some(
      (ex: CustomErrorType) => exception instanceof ex,
    );
  }

  private setStatusCode(exception): number {
    return this.isInstanceOf(exception)
      ? (HttpStatus[
          (exception as CustomError).getError().statusName
        ] as unknown as number)
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

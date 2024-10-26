import {
  Controller,
  Post,
  Body,
  Inject,
  Res,
  HttpStatus,
} from '@nestjs/common';

import { ITransaction } from '../../../../contexts/transaction-processing/transactions/domain/Transaction';
import SendTransactionToSqs from '../../../../contexts/transaction-processing/transactions/application/sendTransactionToSqs.provider';
import { QueuedTransactionInDynamo } from '../../../../contexts/transaction-processing/queued-transactions/queuedTransactionInDynamo.provider';

import HttpExceptionHandler from '../../../../shared/apps/domain/exceptions/httpExceptionHandler';
import { StatusResponse } from '../../../../shared/apps/domain/interfaces/statusResponse.interface';
// import { SendMessageResponseMapper } from '../../../../shared/providers/aws/domain/interfaces/sqs.interface';

@Controller('transactions')
export default class ReceiveTransactionsController {
  constructor(
    @Inject(HttpExceptionHandler)
    private readonly httpExceptionHandler: HttpExceptionHandler,
    @Inject(SendTransactionToSqs)
    private readonly sendTransactionToSqs: SendTransactionToSqs,
    @Inject(QueuedTransactionInDynamo)
    private readonly queuedTransactionInDynamo: QueuedTransactionInDynamo,
  ) {}

  @Post('receive')
  async receive(
    @Body() transaction: ITransaction,
    @Res() res: StatusResponse<HttpStatus.OK>,
  ): Promise<unknown> {
    try {
      const response = await this.sendTransactionToSqs.execute(transaction);

      /* const response = await this.queuedTransactionInDynamo.enqueueTransactions(
        {
          ...transaction,
          messageId: '1',
        },
      ); */
      return res.status(HttpStatus.OK).json(response);
    } catch (error: unknown) {
      // TODO replace try/catch with a middleware/interceptor.
      this.httpExceptionHandler.throwHttpException(error);
    }
  }
}

import {
  Controller,
  Post,
  Body,
  Inject,
  Res,
  HttpStatus,
} from '@nestjs/common';

import { ITransaction } from '../../../../../contexts/transactions/domain/transaction';

import HttpExceptionHandler from '../../domain/exceptions/httpExceptionHandler';
import { StatusResponse } from '../../domain/interfaces/statusResponse.interface';
import SendTransaction from '../../application/sendTransaction.provider';

@Controller('transactions')
export default class QueuedTransactionsController {
  constructor(
    @Inject(HttpExceptionHandler)
    private readonly httpExceptionHandler: HttpExceptionHandler,
    @Inject(SendTransaction)
    private readonly sendTransaction: SendTransaction,
  ) {}

  @Post('receive')
  async receive(
    @Body() transaction: ITransaction,
    @Res() res: StatusResponse<HttpStatus.OK>,
  ): Promise<unknown> {
    try {
      const response = await this.sendTransaction.execute(transaction);
      return res.status(HttpStatus.OK).json({ ...response });
    } catch (error: unknown) {
      // TODO replace try/catch with a middleware/interceptor.
      this.httpExceptionHandler.throwHttpException(error);
    }
  }
}

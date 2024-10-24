import {
  Controller,
  Post,
  Body,
  Inject,
  Res,
  HttpStatus,
} from '@nestjs/common';

import { TransactionType } from '../../domain/Transaction';
import SendTransactionToSqs from '../../application/sendTransactionToSqs.provider';

import { StatusResponse } from '../../../../shared/api/domain/interfaces/statusResponse.interface';
import HttpExceptionHandler from '../../../../shared/api/domain/exceptions/httpExceptionHandler';

@Controller('transactions')
export default class ReceiveTransactionsController {
  constructor(
    @Inject(HttpExceptionHandler)
    private readonly httpExceptionHandler: HttpExceptionHandler,
    @Inject(SendTransactionToSqs)
    private readonly sendTransactionToSqs: SendTransactionToSqs,
  ) {}

  @Post('receive')
  async receive(
    @Body() transaction: TransactionType,
    @Res() res: StatusResponse<HttpStatus.OK>,
  ): Promise<unknown> {
    try {
      const response = await this.sendTransactionToSqs.execute(transaction);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: unknown) {
      // TODO replace try/catch with a middleware/interceptor.
      this.httpExceptionHandler.throwHttpException(error);
    }
  }
}

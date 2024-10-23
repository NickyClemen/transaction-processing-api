import {
  Controller,
  Post,
  Body,
  Inject,
  Res,
  HttpStatus,
} from '@nestjs/common';

import { TransactionType } from '../../../libraries/models/Transaction';
import { StatusResponse } from '../../../libraries/interfaces/statusResponse.interface';

import SendTransactionToSqs from '../../application/providers/sendTransactionToSqs.service';
import HttpExceptionHandler from '../../../libraries/exceptions/httpExceptionHandler';

@Controller('transactions')
export default class ReceiveTransactionsController {
  constructor(
    @Inject(HttpExceptionHandler)
    private readonly httpExceptionHandler: HttpExceptionHandler,
    @Inject(SendTransactionToSqs)
    private readonly sqsTransactionToSqs: SendTransactionToSqs,
  ) {}

  @Post('receive')
  async receive(
    @Body() transaction: TransactionType,
    @Res() res: StatusResponse<HttpStatus.OK>,
  ): Promise<unknown> {
    try {
      const response = await this.sqsTransactionToSqs.execute(transaction);
      return res.status(HttpStatus.OK).json(response);
    } catch (error: unknown) {
      this.httpExceptionHandler.throwHttpException(error);
    }
  }
}

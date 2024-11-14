import {
  Controller,
  Post,
  Body,
  Inject,
  Res,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';

import { ITransaction } from '../../../../../contexts/transactions/domain/transaction';

import QueuedTransactionsErrorFilter from '../../domain/exceptions/queuedTransactionsErrorFilter';
import { StatusResponse } from '../../domain/interfaces/statusResponse.interface';
import SendTransaction from '../../application/sendTransaction.provider';

@Controller('transactions')
@UseFilters(QueuedTransactionsErrorFilter)
export default class QueuedTransactionsController {
  constructor(
    @Inject(SendTransaction)
    private readonly sendTransaction: SendTransaction,
  ) {}

  @Post('receive')
  async receive() /* @Body() transaction: ITransaction,
    @Res() res: StatusResponse<HttpStatus.OK>, */
  : Promise<unknown> {
    return {
      statusCode: 200,
      body: JSON.stringify('Hello World'),
    };
    /* const response = await this.sendTransaction.execute(transaction);
    return res.status(HttpStatus.OK).json({ ...response }); */
  }
}

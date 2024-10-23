import { Inject, Injectable } from '@nestjs/common';

import SqsProvider from '../../../libraries/aws/sqs.provider';
import { TransactionType } from '../../../libraries/models/Transaction';

@Injectable()
export default class SendTransactionToSqs {
  constructor(@Inject(SqsProvider) private readonly SqsProvider: SqsProvider) {}

  async execute(messageBody: TransactionType): Promise<unknown> {
    return await this.SqsProvider.sendMessage(messageBody);
  }
}

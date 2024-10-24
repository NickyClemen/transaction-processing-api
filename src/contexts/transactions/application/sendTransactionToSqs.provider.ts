import { Inject, Injectable } from '@nestjs/common';

import { TransactionType } from '../domain/Transaction';
import SendMessageToSqs from '../../../shared/providers/aws/application/sendMessageToSqs.provider';

@Injectable()
export default class SendTransactionToSqs {
  constructor(
    @Inject(SendMessageToSqs)
    private readonly sendMessageToSqs: SendMessageToSqs<TransactionType>,
  ) {}

  async execute(messageBody: TransactionType): Promise<unknown> {
    return await this.sendMessageToSqs.execute(messageBody);
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { TransactionMessageBody } from '../domain/Transaction';

import SendMessageToSqs from '../../../../shared/providers/aws/application/sendMessageToSqs.provider';
import { SendMessageResponseMapper } from '../../../../shared/providers/aws/domain/interfaces/sqs.interface';

@Injectable()
export default class SendTransactionToSqs {
  constructor(
    @Inject(SendMessageToSqs)
    private readonly sendMessageToSqs: SendMessageToSqs<TransactionMessageBody>,
  ) {}

  async execute(
    messageBody: TransactionMessageBody,
  ): Promise<SendMessageResponseMapper> {
    return await this.sendMessageToSqs.execute(messageBody);
  }
}

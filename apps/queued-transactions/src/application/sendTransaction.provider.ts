import { Inject, Injectable } from '@nestjs/common';

import { TransactionMessageBody } from '../../../../contexts/transactions/domain/transaction';

import SendMessage from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/sendMessage.provider';
import { SendMessageResponseMapper } from '../../../../shared/infraestructure/aws/infraestructure/sqs/domain/interfaces/sqs.interface';

@Injectable()
export default class SendTransaction {
  constructor(
    @Inject(SendMessage)
    private readonly sendMessage: SendMessage<TransactionMessageBody>,
  ) {}

  async execute(
    transaction: TransactionMessageBody,
  ): Promise<SendMessageResponseMapper> {
    const { messageId }: SendMessageResponseMapper =
      await this.sendMessage.execute(transaction);
    const result: ResponseMapper =
      await this.queuedTransactionRepository.getItem({
        messageId,
      });

    if (result.item) {
      return await this.deleteMessagesFromSqs.execute(receiptHandle);
    }

    await this.queuedTransactionRepository.putItem({
      messageId,
      ...JSON.parse(body),
    });
  }
}

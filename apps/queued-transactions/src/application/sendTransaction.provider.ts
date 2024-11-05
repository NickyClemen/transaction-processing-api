import { Inject, Injectable } from '@nestjs/common';

import QueuedTransactionRepository from '../../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';
import { TransactionMessageBody } from '../../../../contexts/transactions/domain/transaction';
import { IQueuedTransactionRepository } from '../../../../contexts/queue-transactions/domain/queuedTransaction';

import SendMessage from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/sendMessage.provider';
import { SendMessageResponseMapper } from '../../../../shared/infraestructure/aws/infraestructure/sqs/domain/interfaces/sqs.interface';
import { ResponseMapper } from '../../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';
import { ReceiveMessagesOutput } from '../../../../shared/infraestructure/aws/infraestructure/sqs/domain/interfaces/receiveMessagesOutput';

@Injectable()
export default class SendTransaction {
  constructor(
    @Inject(SendMessage)
    private readonly sendMessage: SendMessage,
    @Inject(QueuedTransactionRepository.QUEUED_TRANSACTION_REPOSITORY)
    private readonly queuedTransactionsRepository: IQueuedTransactionRepository,
  ) {}

  async execute(
    transaction: TransactionMessageBody,
  ): Promise<
    SendMessageResponseMapper | ReceiveMessagesOutput | ResponseMapper
  > {
    const { messageId }: SendMessageResponseMapper =
      await this.sendMessage.execute(transaction);
    return await this.queuedTransactionsRepository.putItem({
      messageId,
      ...transaction,
    });
  }
}

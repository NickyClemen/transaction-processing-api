import { Inject, Injectable } from '@nestjs/common';

import {
  ITransactionRepository,
  TransactionMessageBody,
} from '../../../../contexts/transactions/domain/transaction';

import { SQSRecord } from 'aws-lambda';

import QueuedTransactionRepository from '../../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';
import TransactionRepository from '../../../../contexts/transactions/infraestructure/transactions.repository';
import Status from '../../../../contexts/transactions/domain/status.enum';
import ValidatorBuilder from '../../../../contexts/validation-service/application/validatorBuilder.provider';

import DeleteMessagesFromSqs from './deleteMessagesFromSqs.provider';
import { IQueuedTransactionRepository } from 'contexts/queue-transactions/domain/queuedTransaction';

@Injectable()
export class ProcessMessages {
  constructor(
    @Inject(QueuedTransactionRepository.QUEUED_TRANSACTION_REPOSITORY)
    private readonly queuedTransactionRepository: IQueuedTransactionRepository,
    @Inject(TransactionRepository.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
    @Inject(ValidatorBuilder)
    private readonly validatorBuilder: ValidatorBuilder,
    @Inject(DeleteMessagesFromSqs)
    private readonly deleteMessagesFromSqs: DeleteMessagesFromSqs,
  ) {}

  async processMessages(records: SQSRecord[]): Promise<void> {
    for (const record of records) {
      const { messageId, body, receiptHandle }: SQSRecord = record;

      try {
        await this.validatorBuilder.execute({
          ...JSON.parse(body),
        } as TransactionMessageBody);

        await this.putTransactions(
          { ...JSON.parse(body) },
          messageId,
          Status.PAID,
        );

        await this.deleteMessagesFromSqs.execute(receiptHandle);
      } catch (error: unknown) {
        this.putTransactions({ ...JSON.parse(body) }, messageId, Status.REJECT);
      }
    }
  }

  async putTransactions(body, messageId: string, status: string) {
    await this.transactionRepository.putItem({
      ...JSON.parse(body),
      status,
    });

    await this.queuedTransactionRepository.putItem({
      messageId,
      status,
    });
  }
}

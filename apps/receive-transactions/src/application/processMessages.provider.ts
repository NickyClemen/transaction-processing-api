import { Inject, Injectable } from '@nestjs/common';

import { SQSRecord } from 'aws-lambda';

import QueuedTransactionRepository from '../../../../contexts/queue-transactions/infraestructure/queueTransaction.repository';

import { ResponseMapper } from '../../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';

@Injectable()
export class ProcessMessages {
  constructor(
    @Inject(QueuedTransactionRepository)
    private readonly queuedTransactionRepository: QueuedTransactionRepository,
  ) {}

  async processMessages(records: SQSRecord[]) {
    for (const record of records) {
      const { messageId, body } = record;
      const result: ResponseMapper =
        await this.queuedTransactionRepository.getItem({
          messageId,
        });

      if (result.item) {
        const { item } = result;
        console.log(item);
      }

      await this.queuedTransactionRepository.putItem({
        messageId,
        ...JSON.parse(body),
      });
    }
  }
}

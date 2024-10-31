import { Inject, Injectable } from '@nestjs/common';

import DeleteMessage from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/deleteMessage.provider';
import { ReceiveMessagesOutput } from '../../../../shared/infraestructure/aws/infraestructure/sqs/domain/interfaces/receiveMessagesOutput';

@Injectable()
export default class DeleteMessagesFromSqs {
  constructor(
    @Inject(DeleteMessage)
    private readonly deleteMessages: DeleteMessage,
  ) {}

  async execute(receiptHandle): Promise<ReceiveMessagesOutput> {
    return await this.deleteMessages.deleteMessage(receiptHandle);
  }
}

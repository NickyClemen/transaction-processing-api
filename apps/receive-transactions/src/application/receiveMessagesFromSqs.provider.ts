import { Inject, Injectable } from '@nestjs/common';

import ReceiveMessage from '../../../../shared/infraestructure/aws/infraestructure/sqs/application/receiveMessage.provider';
import { ReceiveMessagesOutput } from '../../../../shared/infraestructure/aws/infraestructure/sqs/domain/interfaces/receiveMessagesOutput';

@Injectable()
export default class ReceiveMessagesFromSqs {
  constructor(
    @Inject(ReceiveMessage)
    private readonly receiveMessageFromSqs: ReceiveMessage,
  ) {}

  async execute(): Promise<ReceiveMessagesOutput> {
    return await this.receiveMessageFromSqs.receiveMessages();
  }
}

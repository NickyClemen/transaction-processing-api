import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReceiveMessagesOutput } from '../../../../shared/infraestructure/aws/infraestructure/sqs/domain/interfaces/receiveMessagesOutput';

import { ReceiveMessagesCommand } from '../commands/receiveMessages.command';
import ReceiveMessagesFromSqs from '../application/receiveMessagesFromSqs.provider';

@CommandHandler(ReceiveMessagesCommand)
export class ReceiveMessageHandler
  implements ICommandHandler<ReceiveMessagesCommand>
{
  constructor(
    @Inject(ReceiveMessagesFromSqs)
    private readonly receiveMessagesFromSqs: ReceiveMessagesFromSqs,
  ) {}

  async execute(): Promise<ReceiveMessagesOutput> {
    return await this.receiveMessagesFromSqs.execute();
  }
}

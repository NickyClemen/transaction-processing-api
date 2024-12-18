import { Inject, Injectable } from '@nestjs/common';

import { ReceiveMessagesOutput } from '../../../../shared/infraestructure/aws/infraestructure/sqs/domain/interfaces/receiveMessagesOutput';
import { ResponseMapper } from '../../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';

import { HandlerParameters } from '../domain';
import { ProcessMessages } from './processMessages.provider';
@Injectable()
export default class ReceiveMessagesFromSqs {
  constructor(
    @Inject(ProcessMessages)
    private readonly processMessages: ProcessMessages,
  ) {}

  async execute({ event, context }: HandlerParameters): Promise<void> {
    const { Records } = event;
    await this.processMessages.processMessages(Records);
  }
}

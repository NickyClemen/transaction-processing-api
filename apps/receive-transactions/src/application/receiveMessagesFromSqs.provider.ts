import { Inject, Injectable } from '@nestjs/common';

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
    this.processMessages.processMessages(Records);
  }
}

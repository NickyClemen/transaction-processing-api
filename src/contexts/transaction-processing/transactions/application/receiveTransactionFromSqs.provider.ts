import { Inject, Injectable } from '@nestjs/common';

import ReceiveMessageFromSqs from '../../../../shared/providers/aws/application/receiveMessageFromSqs.provider';

@Injectable()
export default class ReceiveTransactionFromSqs {
  constructor(
    @Inject(ReceiveMessageFromSqs)
    private readonly receiveMessageFromSqs: ReceiveMessageFromSqs,
  ) {}

  async execute() {
    await this.receiveMessageFromSqs.receiveMessages();
  }
}

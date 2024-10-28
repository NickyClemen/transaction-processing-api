import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ReceiveTransactionFromSqs from '../../../contexts/receive-transactions/application/receiveTransactionFromSqs.provider';

import SqsProvider from '../../../shared/infraestructure/aws/infraestructure/sqs/application/sqs.provider';
import ReceiveMessageFromSqs from '../../../shared/infraestructure/aws/infraestructure/sqs/application/receiveMessage.provider';
import { SqsProvide } from '../../../shared/infraestructure/aws/infraestructure/sqs/infraestructure';

@Module({
  providers: [
    ReceiveTransactionFromSqs,
    ReceiveMessageFromSqs,
    SqsProvider,
    SqsProvide,
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.testing'],
    }),
  ],
})
export class ReceiveTransactionsModule {}

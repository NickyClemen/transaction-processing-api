import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ReceiveTransactionFromSqs from '../../contexts/transaction-processing/transactions/application/receiveTransactionFromSqs.provider';

import ReceiveMessageFromSqs from '../../shared/providers/aws/application/receiveMessageFromSqs.provider';
import SqsProvider from '../../shared/providers/aws/infraestructure/sqs.provider';
import { sqsProviders } from '../../shared/providers/aws/infraestructure/awsClients.provider';

@Module({
  providers: [
    ReceiveTransactionFromSqs,
    ReceiveMessageFromSqs,
    SqsProvider,
    sqsProviders,
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.testing'],
    }),
  ],
})
export class PreProcessingTransactionModule {}

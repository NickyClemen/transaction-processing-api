import { Module } from '@nestjs/common';

import { dynamoProviders } from '../../shared/providers/aws/infraestructure/awsClients.provider';

@Module({
  providers: [dynamoProviders],
})
export class ValidationService {}

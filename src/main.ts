import { NestFactory } from '@nestjs/core';
import { ReceiveTransactionsModule } from './apps/receive-transactions/receive-transactions.module';

async function bootstrap() {
  const app = await NestFactory.create(ReceiveTransactionsModule);
  await app.listen(3000);
}
bootstrap();

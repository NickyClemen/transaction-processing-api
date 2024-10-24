import { NestFactory } from '@nestjs/core';
import { ReceiveTransactionsModule } from './receive-transactions.module';

async function bootstrap() {
  const app = await NestFactory.create(ReceiveTransactionsModule);
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { QueuedTransactionModule } from './queued-transactions.module';

async function bootstrap() {
  const app = await NestFactory.create(QueuedTransactionModule);
  await app.listen(3000);
}
bootstrap();

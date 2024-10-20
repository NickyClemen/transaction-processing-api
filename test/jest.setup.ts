import CreateNestApplication from './mocks/api/testClient';
import Server from './mocks/api/server';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

export let server: Server;
let app: INestApplication;

const createNestApplication = new CreateNestApplication({
  imports: [AppModule],
});

beforeEach(async (): Promise<void> => {
  app = await createNestApplication.create();
  await app.init();

  server = new Server(app);
});

afterEach(async (): Promise<void> => {
  await app.close();
});

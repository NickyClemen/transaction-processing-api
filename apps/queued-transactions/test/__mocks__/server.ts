import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';

export default class Server {
  private readonly request;
  constructor(readonly app: INestApplication) {
    this.request = supertest(this.app.getHttpServer());
  }

  get(endpoint): supertest.Test {
    return this.request.get(endpoint);
  }

  post(endpoint): supertest.Test {
    return this.request.post(endpoint);
  }
}

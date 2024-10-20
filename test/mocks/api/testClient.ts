import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import ModuleBuilder from '../moduleBuilder.mock';

export default class CreateNestApplication {
  constructor(private readonly metadata: ModuleMetadata) {}

  async create(): Promise<INestApplication> {
    const moduleBuilder: ModuleBuilder = new ModuleBuilder(this.metadata);
    const moduleFixture: TestingModule = await moduleBuilder.moduleBuilder();
    return moduleFixture.createNestApplication();
  }
}

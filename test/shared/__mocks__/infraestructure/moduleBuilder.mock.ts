import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

export default class ModuleBuilder {
  constructor(private readonly metadata: ModuleMetadata) {}
  async moduleBuilder(): Promise<TestingModule> {
    const moduleFixture: TestingModule = await Test.createTestingModule(
      this.metadata,
    ).compile();

    return moduleFixture;
  }
}

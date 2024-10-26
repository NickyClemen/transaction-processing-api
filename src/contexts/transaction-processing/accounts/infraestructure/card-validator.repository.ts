import { IRepository } from 'src/shared/repository.interface';

export class AccountRepository implements IRepository {
  constructor(private readonly connector) {}
  getItem() {
    throw new Error('Method not implemented.');
  }
  putItem() {
    throw new Error('Method not implemented.');
  }
}

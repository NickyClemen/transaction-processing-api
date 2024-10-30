import { IRepository } from '../../../shared/domain/interfaces/repository.interface';
import IBuyer from '../../../shared/domain/interfaces/buyer';
import { Balance } from '../../../shared/domain/models/balance';

const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

interface IAccountRepository extends IRepository {}

interface ILastLogin {
  ip: string;
  date: number;
}

interface IAccount extends IBuyer {
  id: string;
  country: string;
  balance: Balance;
  lastLogin: ILastLogin;
}

export { IAccount, ACCOUNT_REPOSITORY, IAccountRepository };

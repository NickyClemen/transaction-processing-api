import IBuyer from '../../shared/domain/buyer';
import { Balance } from '../../shared/domain/balance';

interface ILastLogin {
  ip: string;
  date: number;
}

interface IAccount extends IBuyer {
  id: string;
  balance: Balance;
  lastLogin: ILastLogin;
}

export { IAccount };

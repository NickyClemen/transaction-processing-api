import IAccount from '../interfaces/Account.interface';

export default class Account implements IAccount {
  accountId: string;
  firstName: string;
  lastName: string;
  registrationDate: number;
  country: string;
  zipCode: string;
  currency: string;
  balance: number;
  lastTransaction?: string;
  lastLogin?: number;
}

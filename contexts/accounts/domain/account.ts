import IBuyer from '../../../shared/domain/interfaces/buyer';
import { IBalance } from '../../../shared/domain/models/balance';
import { IRepository } from '../../../shared/domain/interfaces/repository.interface';
import { ResponseMapper } from '../../../shared/infraestructure/aws/infraestructure/dynamo/domain/interfaces/responseMapper.interface';

interface IAccountRepository extends IRepository {
  getItem(input): Promise<ResponseMapper>;
  putItem(input): Promise<ResponseMapper>;
}

interface ILastLogin {
  ip: string;
  date: number;
}

interface IAccount extends IBuyer {
  id: string;
  country: string;
  balance: IBalance;
  lastLogin: ILastLogin;
}

export { IAccount, IAccountRepository };

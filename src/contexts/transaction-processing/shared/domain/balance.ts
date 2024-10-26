import { ValueObject } from '../../../../shared/apps/domain/valueObjects/valueObject';

interface IBalance {
  funds: number;
  currency: string;
}

class Balance extends ValueObject<IBalance> {}

export { Balance, IBalance };

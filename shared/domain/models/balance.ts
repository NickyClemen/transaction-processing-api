import { ValueObject } from './valueObject';

interface IBalance {
  funds: number;
  currency: string;
}

class Balance implements ValueObject<IBalance> {}

export { Balance, IBalance };

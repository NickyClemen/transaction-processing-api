import { ValueObject } from './valueObject';

interface IIdentification {
  value: string;
  type: string;
}
class Identification extends ValueObject<IIdentification> {}

export { Identification, IIdentification };

import { IIdentification } from './identification';

interface ICardHolder {
  name: string;
  identification: IIdentification;
}

interface ICard {
  id: string;
  brand: string;
  number: string;
  cardHolder: ICardHolder;
  limit?: number;
  cvv: string;
  expiration: string;
}

export { ICard, ICardHolder };

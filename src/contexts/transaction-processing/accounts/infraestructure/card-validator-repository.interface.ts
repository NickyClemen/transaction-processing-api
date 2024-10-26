import { ICard } from '../../shared/domain/card';

export default interface ICardValidatorRepository {
  findBy(query: Partial<ICard>): ICard[] | [];
  findById(id: string): ICard | undefined;
}

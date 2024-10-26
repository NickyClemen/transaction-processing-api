import IAddress from './address';

export default interface IBuyer {
  id: string;
  firstName: string;
  lastName: string;
  cellPhone: string;
  birthday: string;
  taxIdType: string;
  taxIdNumber: string;
  personalIdType: string;
  personalIdNumber: string;
  userEmail: string;
  address: IAddress;
}

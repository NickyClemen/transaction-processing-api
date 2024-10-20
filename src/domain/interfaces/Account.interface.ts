export default interface Account {
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

import { transactionMock } from './transaction.mock';

function addMinutes(minutes) {
  const date: Date = new Date();
  date.setMinutes(minutes);
  return date.getTime();
}

export default [
  {
    ...transactionMock,
    messageId: '2e1424d4-f796-459a-8184-9c92662be6cr',
    created_at: new Date().getTime(),
  },
  {
    ...transactionMock,
    messageId: '059f36b4-87a3-44ab-83d2-661975830a7d',
    externalId: 'a35d8967-fc56-4e51-b53b-6a6e593d7920',
    created_at: addMinutes(5),
    amount: 150,
  },
  {
    ...transactionMock,
    messageId: '2e1424d4-f796-459a-8184-9c92662be6da',
    externalId: 'b64c2108-dea6-4221-8885-04f1de4142ce',
    created_at: addMinutes(10),
    amount: 300,
  },
];

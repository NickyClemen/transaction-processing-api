import { Message } from '../types/message';

interface ReceiveMessagesOutput {
  status: number;
  requestId: string;
  messages: Message | [];
}

export { ReceiveMessagesOutput };

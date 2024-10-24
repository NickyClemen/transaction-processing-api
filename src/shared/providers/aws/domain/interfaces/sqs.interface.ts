export interface SQSMessage {
  QueueUrl: string;
  MessageBody: string;
  MessageGroupId?: string;
  MessageDeduplicationId?: string;
  DelaySeconds?: number;
}

export interface Job {
  DataType: string;
  value: string;
}

export interface MessageAttributes {
  job: Job;
}

export interface MessageBody {
  messageId: string;
  message: any;
  date: string;
  MessageAttributes: MessageAttributes;
}

interface SendMessageResponseMapper {
  status: number;
  requestId: string;
  messageId: string;
  body?: string;
  md5OfMessageBody: string;
  receiptHandle?: string;
}

export { SendMessageResponseMapper };

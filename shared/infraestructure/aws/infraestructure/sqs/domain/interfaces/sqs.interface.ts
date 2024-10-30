interface SendMessageResponseMapper {
  status: number;
  requestId: string;
  messageId: string;
  md5OfMessageBody: string;
}

export { SendMessageResponseMapper };

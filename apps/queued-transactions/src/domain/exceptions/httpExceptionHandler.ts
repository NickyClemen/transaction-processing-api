import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export default class HttpExceptionHandler {
  throwHttpException(error) {
    console.log(error);
    const { type, message, statusName } = error.getError();
    const httpStatus: number = HttpStatus[statusName] as unknown as number;
    throw new HttpException(
      {
        status: httpStatus,
        error: message,
      },
      httpStatus,
      { cause: type },
    );
  }
}

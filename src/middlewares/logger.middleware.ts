import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { method, baseUrl } = request;

    response.on('close', () => {
      const { statusCode } = response;
      const requestLog = `${method} ${baseUrl} ${statusCode}`;
      console.log(requestLog);
    });

    next();
  }
}

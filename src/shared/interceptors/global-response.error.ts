import { Request } from 'express';

export const GlobalResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
): ResponseError => ({
  code,
  statusCode,
  message,
  timestamp: new Date().toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
  }),
  method: request.method,
  path: request.url,
});

export interface ResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

import {
  Catch,
  HttpStatus,
  BadRequestException,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { CannotCreateEntityIdMapError } from 'typeorm/error/CannotCreateEntityIdMapError';

import { Request, Response } from 'express';
import { GlobalResponseError } from './global-response.error';
import { QueryFailedError } from 'typeorm';

interface ResponseParams {
  body?: object | string;
  protocol?: 'http';
  stacktrace?: string;
  status?: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let code = 'HttpException';
    let status =
      (exception as any)?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      (exception as any)?.response?.statusText || 'Internal Server Error';

    switch (exception.constructor) {
      case QueryFailedError:
        status = HttpStatus.CONFLICT;
        message = (exception as QueryFailedError).driverError.detail;
        break;
      case NotFoundException:
        status = (exception as NotFoundException).getStatus();
        message = ((exception as NotFoundException).getResponse() as any)
          .message;
        code = 'NotFoundException';
        break;
      case BadRequestException:
        status = (exception as BadRequestException).getStatus();
        message = ((exception as BadRequestException).getResponse() as any)
          .message;
        code = 'BadRequestException';
        break;
      case HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).getResponse();
        break;
      case ForbiddenException:
        status = (exception as ForbiddenException).getStatus();
        message = (exception as ForbiddenException).getResponse()['message'];
        break;
      case EntityNotFoundError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        break;
      case CannotCreateEntityIdMapError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const { method, url, params, body } = request;
    const responseAux: ResponseParams = {
      body: message,
      status,
    };

    console.error(`Error on request `, {
      endpoint_type: method,
      endpoint_url: url,
      reqParams: {
        params,
        body,
      },
      response: responseAux,
    });

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }
}

import { Request, Response, NextFunction } from 'express';

import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    mockRequest = {
      method: 'GET',
      baseUrl: '/test',
    };
    mockResponse = {
      statusCode: 200,
      on: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should log method, baseUrl, and statusCode after response is closed', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.on).toHaveBeenCalledWith('close', expect.any(Function));

    const callback = (mockResponse.on as jest.Mock).mock.calls[0][1];
    callback();

    expect(logSpy).toHaveBeenCalledWith('GET /test 200');
    expect(mockNext).toHaveBeenCalled();

    logSpy.mockRestore();
  });
});

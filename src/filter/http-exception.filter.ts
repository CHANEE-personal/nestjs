import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

/**
	 * <pre>
	 * 1. className  : HttpExceptionFilter 
	 * 2. ClassName  : http-exception.filter.ts
	 * 3. Comment    : 예외 처리
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 03.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';

// TODO: доделать декоратор
export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    if (data && typeof request.cookies?.[data] === 'string') {
      return request.cookies?.[data];
    }
    return request.cookies;
  },
);

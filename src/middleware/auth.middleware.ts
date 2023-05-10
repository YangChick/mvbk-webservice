import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    try {
      const verifiedToken = jwt.verify(
        token.split(' ')[1],
        process.env.JWT_SECRET,
      );
      if (verifiedToken) {
        const resolveTokenData: { roleCode: string; exp: number } =
          verifiedToken as { roleCode: string; exp: number };
        const { exp } = resolveTokenData;
        const isExpired = new Date().getTime() > exp * 1000;
        if (isExpired)
          throw new HttpException('Not acceptable', HttpStatus.NOT_ACCEPTABLE);
        next();
      }
    } catch (e) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}

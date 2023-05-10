import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
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
        const { roleCode } = resolveTokenData;
        const isAdmin = roleCode === Role.ADMIN;
        if (isAdmin) next();
        else
          throw new HttpException('Not acceptable', HttpStatus.NOT_ACCEPTABLE);
      }
    } catch (e) {
      throw new HttpException('No permission', HttpStatus.FORBIDDEN);
    }
    // next();
  }
}

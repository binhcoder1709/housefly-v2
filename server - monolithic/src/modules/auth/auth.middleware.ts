import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userRepos: UserRepository) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/auth/register') {
      const user = await this.userRepos.findByEmail(req.body.email);
      if (!user) {
        throw new BadRequestException();
      }
      next();
    } else if (req.path === '/auth/login') {
      const user = await this.userRepos.findByEmail(req.body.email);
      if (user) {
        throw new BadRequestException();
      }
      if (user.role === 0) {
        throw new ForbiddenException();
      }
      next();
    }
  }
}

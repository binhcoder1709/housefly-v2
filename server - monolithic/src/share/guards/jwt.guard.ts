import {
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { AuthGuard } from '@nestjs/passport';
  import { UserRepository } from 'src/modules/v1/users/user.repository';
  import { Cache } from 'cache-manager';
import { RedisService } from 'src/modules/v1/redis/redis.service';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
      private readonly jwtService: JwtService,
      private readonly userRepos: UserRepository,
      private readonly redisService:RedisService,
    ) {
      super();
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
  
      try {
        // Verify the token
        const verifyToken = await this.jwtService.verify(token, {
          secret: process.env.ACCESS_SECRET_KEY,
        });
        // Check if token is valid and not expired
        if (verifyToken) {
          // Check user existence and status
          const checkUserWithId = await this.userRepos.findById(
            verifyToken.user_id
          );
          if (
            checkUserWithId &&
            checkUserWithId.email === verifyToken.email &&
            checkUserWithId.status === 1
          ) {
            // Check if token is cached
            const tokenCache = await this.redisService.get(
              `at-${verifyToken.user_id}`
            );
  
            // If token in cache matches the provided token, return false (token is invalid)
            if (tokenCache === token) {
              throw new UnauthorizedException('Token is no longer valid');
            }
  
            // Token is valid and not found in cache, proceed with request
            return true;
          } else {
            throw new UnauthorizedException('User is not active');
          }
        }
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Token has expired');
        }
        throw new UnauthorizedException('Invalid token');
      }
  
      return false;
    }
  
    private extractTokenFromHeader(request: any): string | null {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return null;
      }
      const parts = authHeader.split(' ');
      if (parts.length === 2) {
        return parts[1];
      }
      return null;
    }
  }
  
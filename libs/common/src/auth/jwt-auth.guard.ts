import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ cookies?: { Authentication?: string }; user?: UserDto }>();
    const jwt: string | undefined = request.cookies?.Authentication;
    if (!jwt) {
      console.log("first guard can't find jwt");
      return false;
    }
    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          console.log('res from auth service', res);
          const req = context.switchToHttp().getRequest<{ user?: UserDto }>();
          req.user = res;
        }),
        map(() => true),
      );
  }
}

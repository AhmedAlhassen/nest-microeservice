import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocumnet } from 'apps/auth/src/users/models/user.schema';

const getCurrentUserByContext = (ctx: ExecutionContext): UserDocumnet => {
  const request = ctx.switchToHttp().getRequest<{ user: UserDocumnet }>();
  console.log('currentUser', request.user);
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);

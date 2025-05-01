import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { UsePermission } from '../decorators/permission.decorator';
import { permissionChecker } from '../permission.provider';
import { ExtractAuthor } from '../decorators/extract-author.decotator';

@Injectable()
export class CheckAuthInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { action, resource } = this.reflector.get(
      UsePermission,
      context.getHandler(),
    );
    const extractAuthor = this.reflector.get(
      ExtractAuthor,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((value) => {
        if (
          permissionChecker.can(request.user.role, {
            action,
            resource,
            possession: 'any',
          }) ||
          (Array.isArray(value)
            ? value.every((item) => extractAuthor(item) === request.user.id)
            : extractAuthor(value) === request.user.id)
        ) {
          return value;
        }
        throw new ForbiddenException();
      }),
    );
  }
}

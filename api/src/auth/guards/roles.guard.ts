import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../types/permission.type';
import { UsePermission } from '../decorators/permission.decorator';
import { permissionChecker } from '../permission.provider';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get(UsePermission, context.getHandler());
    const role: Role = context.switchToHttp().getRequest().user.role;
    return permissionChecker.can(role, permission);
  }
}

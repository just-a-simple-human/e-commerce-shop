import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Permission } from '../types/permission.type';
import { UsePermission } from './permission.decorator';
import { CheckAuthInterceptor } from '../interseptors/check-author.interceptor';
import { ExtractAuthor } from './extract-author.decotator';

export const UseAuth = (
  permission: Permission,
  extractAuthor?: (entity: any) => number,
) =>
  applyDecorators(
    ExtractAuthor(extractAuthor),
    UsePermission(permission),
    UseGuards(JwtGuard, RolesGuard),
    UseInterceptors(CheckAuthInterceptor),
  );

import { Reflector } from '@nestjs/core';
import { Permission } from '../types/permission.type';

export const UsePermission = Reflector.createDecorator<Permission>();

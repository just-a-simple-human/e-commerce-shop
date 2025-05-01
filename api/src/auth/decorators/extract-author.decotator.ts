import { Reflector } from '@nestjs/core';

export const ExtractAuthor =
  Reflector.createDecorator<(entity: any) => number>();

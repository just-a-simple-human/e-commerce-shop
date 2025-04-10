import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from 'src/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from 'src/entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, MenuItem])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

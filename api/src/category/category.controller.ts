import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MenuItem } from 'src/entities/menu-item.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query('limit') limit: number) {
    return this.categoryService.findAll(limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Patch('add/:id')
  addMenuItems(@Param('id') id: string, @Body() menuItems: MenuItem[]) {
    return this.categoryService.addMenuItems(+id, menuItems);
  }

  @Patch('delete/:id')
  deleteMenuItems(@Param('id') id: string, @Body() menuItems: MenuItem[]) {
    return this.categoryService.deleteMenuItems(+id, menuItems);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

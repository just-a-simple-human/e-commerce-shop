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
import { UseAuth } from 'src/auth/decorators/auth.decorator';
import { Action, Resource } from 'src/auth/types/permission.type';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseAuth({
    action: Action.Create,
    resource: Resource.Category,
    possession: 'any',
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseAuth({
    action: Action.Read,
    resource: Resource.Category,
    possession: 'any',
  })
  findAll(@Query('limit') limit: number) {
    return this.categoryService.findAll(limit);
  }

  @Get(':id')
  @UseAuth({
    action: Action.Read,
    resource: Resource.Category,
    possession: 'any',
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseAuth({
    action: Action.Update,
    resource: Resource.Category,
    possession: 'any',
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Patch(':id/add')
  @UseAuth({
    action: Action.Update,
    resource: Resource.Category,
    possession: 'any',
  })
  addMenuItems(@Param('id') id: string, @Body() menuItems: MenuItem[]) {
    return this.categoryService.addMenuItems(+id, menuItems);
  }

  @Patch(':id/delete')
  @UseAuth({
    action: Action.Update,
    resource: Resource.Category,
    possession: 'any',
  })
  deleteMenuItems(@Param('id') id: string, @Body() menuItems: MenuItem[]) {
    return this.categoryService.deleteMenuItems(+id, menuItems);
  }

  @Delete(':id')
  @UseAuth({
    action: Action.Delete,
    resource: Resource.Category,
    possession: 'any',
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

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
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { UseAuth } from 'src/auth/decorators/auth.decorator';
import { Action, Resource } from 'src/auth/types/permission.type';

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  @UseAuth({
    action: Action.Create,
    resource: Resource.MenuItem,
    possession: 'any',
  })
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Get()
  @UseAuth({
    action: Action.Read,
    resource: Resource.MenuItem,
    possession: 'any',
  })
  findAll(@Query('limit') limit: number) {
    return this.menuItemService.findAll(limit);
  }

  @Get(':id')
  @UseAuth({
    action: Action.Read,
    resource: Resource.MenuItem,
    possession: 'any',
  })
  findOne(@Param('id') id: string) {
    return this.menuItemService.findOne(+id);
  }

  @Patch(':id')
  @UseAuth({
    action: Action.Update,
    resource: Resource.MenuItem,
    possession: 'any',
  })
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemService.update(+id, updateMenuItemDto);
  }

  @Delete(':id')
  @UseAuth({
    action: Action.Delete,
    resource: Resource.MenuItem,
    possession: 'any',
  })
  remove(@Param('id') id: string) {
    return this.menuItemService.remove(+id);
  }
}

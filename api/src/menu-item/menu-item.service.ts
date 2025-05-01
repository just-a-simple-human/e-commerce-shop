import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from 'src/entities/menu-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}
  async create(createMenuItemDto: CreateMenuItemDto) {
    const response = await this.menuItemRepository.save(createMenuItemDto);
    return response;
  }

  async findAll(limit?: number) {
    const response = await this.menuItemRepository.find({ take: limit });
    return response;
  }

  async findOne(id: number) {
    const response = await this.menuItemRepository.findOne({ where: { id } });
    if (!response) {
      throw new NotFoundException(`No menu item with id = ${id}`);
    }
    return response;
  }

  async update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    await this.menuItemRepository.update(id, updateMenuItemDto);
    return updateMenuItemDto;
  }

  async remove(id: number) {
    await this.menuItemRepository.delete({ id: id });
    return id;
  }
}

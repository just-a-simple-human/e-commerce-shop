import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Not, Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { MenuItem } from 'src/entities/menu-item.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepositry: Repository<Category>,
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const response = await this.categoryRepositry.save(createCategoryDto);
    return response;
  }

  async findAll(limit?: number) {
    const response = await this.categoryRepositry.find({
      take: limit,
      relations: { menuItems: true },
    });
    return response;
  }

  async findOne(id: number) {
    const response = await this.categoryRepositry.findOne({
      where: { id },
      relations: { menuItems: true },
    });
    if (!response) {
      throw new NotFoundException(`No category with id = ${id}`);
    }
    return response;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepositry.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`No category with id = ${id}`);
    }
    const response = await this.categoryRepositry.save({
      ...category,
      ...updateCategoryDto,
    });
    return response;
  }

  async addMenuItems(id: number, menuItems: MenuItem[]) {
    const category = await this.categoryRepositry.findOne({
      where: { id },
      relations: { menuItems: true },
    });
    if (!category) {
      throw new NotFoundException(`No category with id = ${id}`);
    }
    const newMenuItems = await this.menuItemRepository.find({
      where: {
        id: Any(category.menuItems.concat(menuItems).map((e) => e.id)),
      },
    });
    const response = await this.categoryRepositry.save({
      ...category,
      menuItems: newMenuItems,
    });
    return response;
  }

  async deleteMenuItems(id: number, menuItems: MenuItem[]) {
    const category = await this.categoryRepositry.findOne({
      where: { id },
      relations: { menuItems: true },
    });
    if (!category) {
      throw new NotFoundException(`No category with id = ${id}`);
    }
    const newMenuItems = category.menuItems.filter(
      (e) => !menuItems.map((e) => e.id).includes(e.id),
    );
    const response = await this.categoryRepositry.save({
      ...category,
      menuItems: newMenuItems,
    });
    return response;
  }

  async remove(id: number) {
    const response = await this.categoryRepositry.delete({ id: id });
    return response;
  }
}

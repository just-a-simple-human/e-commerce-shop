import { MenuItem } from 'src/entities/menu-item.entity';

export class CreateCategoryDto {
  name: string;
  menuItems: MenuItem[];
}

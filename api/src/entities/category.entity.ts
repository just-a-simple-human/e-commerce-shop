import { MenuItem } from 'src/entities/menu-item.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => MenuItem, { cascade: ['update'] })
  @JoinTable({
    name: 'category_menu_item',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'menu_item_id',
      referencedColumnName: 'id',
    },
  })
  menuItems: MenuItem[];
}

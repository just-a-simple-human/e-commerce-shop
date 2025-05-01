import { Category } from 'src/entities/category.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'menu_item' })
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  ingredients: string;
  @Column({ type: 'numeric' })
  price: number;
  @ManyToMany(() => Category, (category) => category.menuItems, {
    cascade: ['update'],
  })
  categories: Category[];
  @ManyToMany(() => Order)
  orders: Order[];
}

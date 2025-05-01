import { Customer } from 'src/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItem } from './menu-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: string;
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;
  @ManyToMany(() => MenuItem)
  @JoinTable({
    name: 'order_menu_item',
    joinColumn: { name: 'order_id' },
    inverseJoinColumn: { name: 'menu_item_id' },
  })
  menuItems: MenuItem[];
}

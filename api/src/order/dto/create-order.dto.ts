import { Customer } from 'src/entities/customer.entity';
import { MenuItem } from 'src/entities/menu-item.entity';

export class CreateOrderDto {
  status: string;
  customer: Customer;
  menuItems: MenuItem[];
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UseAuth } from 'src/auth/decorators/auth.decorator';
import { Action, Resource } from 'src/auth/types/permission.type';
import { Order } from 'src/entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseAuth(
    {
      action: Action.Create,
      resource: Resource.Order,
      possession: 'own',
    },
    (order: Order) => order.customer.id,
  )
  create(@Body() createOrderDto: CreateOrderDto) {
    const response = this.orderService.create(createOrderDto);
    return response;
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @UseAuth(
    { action: Action.Read, resource: Resource.Order, possession: 'own' },
    (order: Order) => order.customer.id,
  )
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}

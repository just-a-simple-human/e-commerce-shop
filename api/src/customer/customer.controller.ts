import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { OrderService } from 'src/order/order.service';
import { CheckAuthInterceptor } from 'src/auth/interseptors/check-author.interceptor';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { permissionChecker } from 'src/auth/permission.provider';
import { Action, Resource, Role } from 'src/auth/types/permission.type';
import { UseAuth } from 'src/auth/decorators/auth.decorator';
import { Customer } from 'src/entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly orderService: OrderService,
  ) {}

  @Get(':id')
  @UseAuth(
    {
      action: Action.Read,
      resource: Resource.CustomerProfile,
      possession: 'own',
    },
    (customer: Customer) => customer.id,
  )
  getProfileById(@Param('id') id: string) {
    const response = this.customerService.findOneById(+id);
    return response;
  }

  @Get(':id/order')
  @UseGuards(JwtGuard)
  getCustomerOrders(@Param('id') id: string) {
    const response = this.orderService.findAllByCustomerId(+id);
    return response;
  }
}

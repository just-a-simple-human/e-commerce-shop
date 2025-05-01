import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const response = await this.orderRepository.save(createOrderDto);
    return response;
  }

  async findAll() {
    const response = await this.orderRepository.find({
      relations: { customer: true, menuItems: true },
      select: { customer: { id: true, email: true, name: true } },
    });
    return response;
  }

  async findAllByCustomerId(customerId: number) {
    const response = await this.orderRepository.find({
      where: { customer: { id: customerId } },
      relations: { menuItems: true },
    });
    return response;
  }

  async findOne(id: number) {
    const response = await this.orderRepository.findOne({
      where: { id },
      relations: { customer: true, menuItems: true },
      select: { customer: { id: true } },
    });
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

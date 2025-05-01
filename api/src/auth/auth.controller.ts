import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { IPayload } from './types/payload.type';
import { LocalCustomerGuard } from './guards/local-customer.guard';
import { LocalEmployeeGuard } from './guards/local-employee.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('customer/register')
  async registerCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const response = this.authService.registerCustomer(createCustomerDto);
    return response;
  }

  @Post('customer/login')
  @UseGuards(LocalCustomerGuard)
  async loginCustomer(@Body() payload: IPayload) {
    const response = this.authService.loginCustomer(payload);
    return response;
  }

  @Post('employee/register')
  async registerEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    const response = this.authService.registerEmployee(createEmployeeDto);
    return response;
  }

  @Post('employee/login')
  @UseGuards(LocalEmployeeGuard)
  async loginEmployee(@Body() payload: IPayload) {
    const response = this.authService.loginEmployee(payload);
    return response;
  }
}

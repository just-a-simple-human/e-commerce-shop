import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterCustomerDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('customer/register')
  async registerCustomer(@Body() registerCustomerDto: RegisterCustomerDto) {
    const response = this.authService.registerCustomer(registerCustomerDto);
    return response;
  }

  @Post('customer/login')
  @UseGuards(AuthGuard(['customer', 'employee']))
  async loginCustomer(@Body() loginDto: LoginDto) {
    const response = this.authService.login(loginDto);
    return response;
  }

  @Post('employee/register')
  async registerEmployee(@Body() loginDto: LoginDto) {
    return loginDto;
  }

  @Post('employee/login')
  @UseGuards(AuthGuard('employee'))
  async loginEmployee(@Body() loginDto: LoginDto) {
    const response = this.authService.login(loginDto);
    return response;
  }
}

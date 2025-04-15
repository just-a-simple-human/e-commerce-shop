import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { CustomerService } from 'src/customer/customer.service';
import { EmployeeService } from 'src/employee/employee.service';
import { RegisterCustomerDto, RegisterEmployeeDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async registerCustomer(registerCustomerDto: RegisterCustomerDto) {
    const customer = await this.customerService.create(registerCustomerDto);
    const { password, ...response } = customer;
    return {
      ...response,
      access_token: this.jwtService.sign({
        id: registerCustomerDto.id,
        email: registerCustomerDto.email,
      }),
    };
  }

  async validateCustomer(email: string, password: string) {
    const customer = await this.customerService.findOneByEmail(email);
    if (!customer) {
      return new NotFoundException();
    }
    const isPasswordMatch = await verify(customer.password, password);
    if (isPasswordMatch) {
      const { password, ...result } = customer;
      return result;
    }
    return null;
  }

  async registerEmployee(registerEmployeeDto: RegisterEmployeeDto) {
    const employee = await this.employeeService.create(registerEmployeeDto);
    const { password, ...response } = employee;
    return {
      ...response,
      access_token: this.jwtService.sign({
        id: registerEmployeeDto.id,
        email: registerEmployeeDto.email,
      }),
    };
  }

  async validateEmployee(email: string, password: string) {
    const employee = await this.employeeService.findOneByEmail(email);
    if (!employee) {
      return new NotFoundException();
    }
    const isPasswordMatch = await verify(employee.password, password);
    if (isPasswordMatch) {
      const { password, ...result } = employee;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const payload = {
      id: loginDto.id,
      email: loginDto.email,
    };
    return { ...payload, access_token: this.jwtService.sign(payload) };
  }
}

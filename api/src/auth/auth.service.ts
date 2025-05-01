import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { CustomerService } from 'src/customer/customer.service';
import { EmployeeService } from 'src/employee/employee.service';
import { IPayload } from './types/payload.type';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { Role } from './types/permission.type';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async registerCustomer(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create({
      ...createCustomerDto,
      password: await hash(createCustomerDto.password),
    });
    const { password, ...response } = customer;
    return {
      ...response,
      access_token: this.jwtService.sign({
        id: createCustomerDto.id,
        email: createCustomerDto.email,
        role: Role.Customer,
      }),
    };
  }

  async validateCustomer(email: string, password: string) {
    const customer = await this.customerService.findOneByEmail(email);
    if (!customer) {
      throw new NotFoundException();
    }
    const isPasswordMatch = await verify(customer.password, password);
    if (isPasswordMatch) {
      const { password, ...result } = customer;
      return result;
    }
    return null;
  }

  async registerEmployee(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeService.create({
      ...createEmployeeDto,
      password: await hash(createEmployeeDto.password),
    });
    const { password, ...response } = employee;
    return {
      ...response,
      access_token: this.jwtService.sign({
        id: createEmployeeDto.id,
        email: createEmployeeDto.email,
        role: Role.Admin,
      }),
    };
  }

  async validateEmployee(email: string, password: string) {
    const employee = await this.employeeService.findOneByEmail(email);
    if (!employee) {
      throw new NotFoundException();
    }
    const isPasswordMatch = await verify(employee.password, password);
    if (isPasswordMatch) {
      const { password, ...result } = employee;
      return result;
    }
    return null;
  }

  async login(payload: IPayload, role: Role) {
    return {
      ...payload,
      access_token: this.jwtService.sign({ ...payload, role: role }),
    };
  }

  async loginCustomer(payload: IPayload) {
    const customer = await this.customerService.findOneByEmail(payload.email);
    if (!customer) {
      throw new NotFoundException();
    }
    const response = await this.login(
      {
        id: customer.id,
        email: customer.email,
      },
      Role.Customer,
    );
    return response;
  }
  async loginEmployee(payload: IPayload) {
    const employee = await this.employeeService.findOneByEmail(payload.email);
    if (!employee) {
      throw new NotFoundException();
    }
    const response = this.login(
      { id: employee.id, email: employee.email },
      Role.Admin,
    );
    return response;
  }
}

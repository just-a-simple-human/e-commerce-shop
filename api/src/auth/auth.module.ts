import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { PassportModule } from '@nestjs/passport';
import { LocalCustomerStrategy } from './strategies/local-customer.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalEmployeeGuard } from './guards/local-employee.guard';
import { LocalEmployeeStrategy } from './strategies/local-employee.strategy';

@Module({
  imports: [
    CustomerModule,
    EmployeeModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalCustomerStrategy,
    LocalEmployeeStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}

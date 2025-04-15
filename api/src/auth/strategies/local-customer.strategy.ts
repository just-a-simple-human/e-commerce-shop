import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalCustomerStrategy extends PassportStrategy(
  Strategy,
  'customer',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateCustomer(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials!');
    }
    return user;
  }
}

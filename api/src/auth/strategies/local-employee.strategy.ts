import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalEmployeeStrategy extends PassportStrategy(
  Strategy,
  'employee',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateEmployee(email, password);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials!');
    }
    return user;
  }
}

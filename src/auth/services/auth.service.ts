import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthSigninDto, AuthSignupDto } from '../dtos';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async signIn(user: AuthSigninDto): Promise<any> {
    const { email, password } = user;

    const userDB = await this.usersService.getByEmail(email);

    if (!userDB) throw new UnauthorizedException('Credentials are not valid');
    if (!bcrypt.compareSync(password, userDB.password))
      throw new UnauthorizedException('Credentials are not valid');

    const payload = { sub: userDB.id, email: userDB.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

  async signUp(user: AuthSignupDto): Promise<any> {
    const { password, ...userReq } = user;

    const userData = {
      ...userReq,
      password: bcrypt.hashSync(password, 10),
    };

    const userDB = await this.usersService.create(userData);

    const payload = { sub: userDB.id, email: userDB.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }
}

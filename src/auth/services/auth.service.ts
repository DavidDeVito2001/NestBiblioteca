import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { PayloadToken } from '../interface/auth.interface';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const userByUsername = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });

    const user = userByUsername || userByEmail;
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  public signJWT(
    payload: jwt.JwtPayload,
    secret: string,
    expires: string | number,
  ): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(
    user: User,
  ): Promise<{ accessToken: string; user: User }> {
    const getUser = await this.userService.getUser(user.id);
    const payload: PayloadToken = {
      rol: getUser.rol,
      sub: getUser.id.toString(),
    };

    const accessToken = this.signJWT(payload, process.env.JWT_SECRET, '1h');

    return { accessToken, user: getUser };
  }
}

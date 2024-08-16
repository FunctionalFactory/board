import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceLogin,
  IAuthServiceGetAccessToken,
} from './interfaces/auth-service.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저 디비에서 찾기
    const user = await this.usersService.findOneByEmail({ email });
    // 2. 일치하는 유저가 없으면 애러던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다');
    // 3. 일치하는 유저가 있지만 비밀번호가 틀렸다면 애러던지기
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      throw new UnprocessableEntityException('암호가 틀렸습니다');
    // 4. 일치하는 유저도 있고, 비밀번호도 맞았다면
    //    => accessToken(=JWT)을 만들어서 브라우저에 전달하기
    return this.getAccessToken({ user });
  }
}

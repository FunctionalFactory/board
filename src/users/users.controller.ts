import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards()
  @Get(':email')
  fetchUser(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail({ email });
  }

  @Post()
  createUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('age') age: number,
  ): Promise<User> {
    return this.usersService.create({ email, password, name, age });
  }
}

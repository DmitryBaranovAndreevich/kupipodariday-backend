import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { LocalGuard } from 'src/guard/local.quard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createNewUser(createUserDto);
    if (user) {
      const token = await this.authService.login(user);
      return token;
    }
  }

  @Get('/signup/all')
  async findAll() {
    const users = await this.authService.getAllUsers();
    return users;
  }

  @UseGuards(LocalGuard)
  @Post('/signin')
  async login(@Req() req: Request) {
    const user = req.user;
    if (user) {
      const token = await this.authService.login(user);
      return token;
    }
  }
}

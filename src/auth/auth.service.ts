import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createNewUser(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);

    return user;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.userId };
    console.log(user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAllUsers() {
    return this.usersService.findAll();
  }
}

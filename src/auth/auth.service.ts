import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcryptjs';
import { TSignInUser } from 'src/interface/user';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createNewUser(createUserDto: TSignInUser): Promise<any> {
    const { password, ...any } = createUserDto;
    const passToHash = await hash(password, 10);
    const user = await this.usersService.create({
      ...any,
      password: passToHash,
    });
    return user;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ where: { username } });
    const matched = await compare(pass, user.password);
    if (matched) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAllUsers() {
    return this.usersService.findAll({});
  }
}

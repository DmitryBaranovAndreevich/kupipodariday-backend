import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SignupService {
  constructor(private usersService: UsersService) {}

  async createNewUser(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);

    return user;
  }

  async getAllUsers() {
   return this.usersService.findAll();
  }
}

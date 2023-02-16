import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    return user;
  }

  async findMany(query: string) {
    const user = await this.usersRepository.findOne({
      where: [{ username: query }, { email: query }],
    });
    if (user) return user;
    return null;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}

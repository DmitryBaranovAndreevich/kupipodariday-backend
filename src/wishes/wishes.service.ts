import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  create(createWishDto: CreateWishDto, user: User) {
    const { id } = user;
    console.log(createWishDto);
    return this.wishRepository.save({ ...createWishDto, owner: id });
  }

  async getAllUserWishes(id: number) {
    // console.log(id)
    const wishes = await this.wishRepository.find({ where: { owner: id } });
    // console.log(wishes)
    return wishes;
  }

  findAll() {
    return this.wishRepository.find();
  }

  findOne(id: number) {
    return this.wishRepository.findOneBy({ id });
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return this.wishRepository.update({ id }, updateWishDto);
  }

  remove(id: number) {
    return this.wishRepository.delete({ id });
  }
}

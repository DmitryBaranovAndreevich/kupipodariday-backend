import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    return await this.wishListRepository.save(createWishlistDto);
  }

  findAll(options: FindManyOptions<Wishlist>) {
    return this.wishListRepository.find(options);
  }

  findOne(options: FindOneOptions<Wishlist>) {
    return this.wishListRepository.findOne(options);
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishListRepository.update({ id }, updateWishlistDto);
  }

  remove(id: number) {
    return this.wishListRepository.delete({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}
  create(createOfferDto: CreateOfferDto) {
    return this.offerRepository.save(createOfferDto);
  }

  findAll(options: FindManyOptions<Offer>) {
    return this.offerRepository.find(options);
  }

  findOne(options: FindOneOptions<Offer>) {
    return this.offerRepository.findOne(options);
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return this.offerRepository.update({ id }, updateOfferDto);
  }

  remove(id: number) {
    return this.offerRepository.delete({ id });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { ICreateOfferDTO } from 'src/interface/offer';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly wishesService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req: Request, @Body() createOfferDto: ICreateOfferDTO) {
    const { itemId, ...all } = createOfferDto;
    const { id, username } = req.user as User;
    const item = await this.wishesService.findOne({ where: { id: itemId } });
    await this.wishesService.update(itemId, {
      raised: Number(item.raised) + all.amount,
    });
    const offer = await this.offersService.create({
      ...all,
      user: id,
      item: item,
      name: username,
    });
    return offer;
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return this.offersService.findAll({
      relations: ['item', 'item.offers', 'item.owner'],
    });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const offers = await this.offersService.findAll({
      relations: ['item'],
      where: { item: { id } },
    });
    return offers;
  }
}

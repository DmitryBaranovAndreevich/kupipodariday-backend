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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req: Request, @Body() createWishDto: CreateWishDto) {
    const user = req.user as User;
    return await this.wishesService.create(createWishDto, user);
  }

  @Get('/last')
  async findAll() {
    const wishes = await this.wishesService.findAll({
      order: { createdAt: 'DESC' },
      take: 40,
    });
    return wishes;
  }

  @Get('/top')
  async findTop() {
    return await this.wishesService.findAll({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findWish(@Param('id') id: number) {
    return await this.wishesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    if (this.wishesService.isOwner(id, user)) {
      return await this.wishesService.update(+id, updateWishDto);
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    if (this.wishesService.isOwner(id, user))
      return this.wishesService.remove(+id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    const {id: Id, ...all} = await this.wishesService.findOne(+id);
    return await this.wishesService.create(all, user);
  }
}

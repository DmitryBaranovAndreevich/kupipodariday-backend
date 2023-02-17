import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';
import { UpdateUser } from 'src/interface/user';
import { WishesService } from 'src/wishes/wishes.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Post('/find')
  async findUser(@Body() findUserDto: { query: string }) {
    const user = await this.usersService.findOne({
      where: [{ username: findUserDto.query }, { email: findUserDto.query }],
    });
    if (user) return [user];
    return [];
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  findMe(@Req() req: Request) {
    const user = req.user;
    const { password, ...result } = user as User;
    return result;
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  async updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUser) {
    const res = { ...req.user } as User;
    for (let key in updateUserDto) {
      if (key === 'password') {
        const secretPass = await hash(updateUserDto[key], 10);
        res[key] = secretPass;
      } else {
        res[key] = updateUserDto[key];
      }
    }
    return this.usersService.update(res.id, res);
  }

  @UseGuards(JwtGuard)
  @Get('/me/wishes')
  async findMeWishes(@Req() req: Request) {
    const user = req.user as User;
    return await this.wishesService.getAllUserWishes(user);
  }

  @UseGuards(JwtGuard)
  @Get('/users/:username')
  async findOtherUser(@Param('username') username: string) {
    return await this.usersService.findOne({ where: { username } });
  }

  @UseGuards(JwtGuard)
  @Get('/users/:username/wishes')
  async findOtherUserWishes(@Param('username') username: string) {
    const user = await this.usersService.findOne({ where: { username } });
    return user.wishlists;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

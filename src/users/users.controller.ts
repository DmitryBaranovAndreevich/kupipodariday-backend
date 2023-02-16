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
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { User } from './entities/user.entity';
import { hash, compare } from 'bcryptjs';
import { UpdateUser } from 'src/interface/user';
import { WishesService } from 'src/wishes/wishes.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @UseGuards(JwtGuard)
  @Post('/find')
  async findUser(@Body() findUserDto: { query: string }) {
    // console.log(findUserDto);
    const user = await this.usersService.findMany(findUserDto.query);
    if (user) return [user];
    return [];
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  findMe(@Req() req: Request) {
    const user = req.user;
    // console.log(user)
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
  findMeWishes(@Req() req: Request) {
    const {id} = req.user as User
    return this.wishesService.getAllUserWishes(id);
  }

  @UseGuards(JwtGuard)
  @Get('/users/:username')
  findOtherUser(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @UseGuards(JwtGuard)
  @Get('/users/:username/wishes')
  async findOtherUserWishes(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    return user.wishlists;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

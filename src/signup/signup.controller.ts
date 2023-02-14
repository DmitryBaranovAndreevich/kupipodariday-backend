import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignupService } from './signup.service';
import { JwtService } from '@nestjs/jwt';

@Controller('signup')
export class SignupController {
  constructor(
    private signupService: SignupService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.signupService.createNewUser(createUserDto);
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  @Get('/all')
  async findAll() {
   const users = await this.signupService.getAllUsers();
   return users
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from './signin.service';

@Controller('signin')
export class SigninController {
  constructor(private signinService: SigninService) {}

  @Post()
  async login(@Body() loginUserDto: { username: string; password: string }) {
    const { username, password } = loginUserDto;
    const user = await this.signinService.validateUser(username, password);
    if (user) {
      const token = await this.signinService.login(user);
      return token;
    }
  }
}

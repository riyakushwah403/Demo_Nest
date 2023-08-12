import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/Dto/userDto';
import { UserLoginDto } from 'src/user/Dto/userLoginDto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  create(@Body() userDto: UserDto) {
    console.log('userDto ', userDto);
    return this.authService.create(userDto);
  }
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const token = await this.authService.login(userLoginDto.email, userLoginDto.password);
    return { token, userLoginDto };
  }
}

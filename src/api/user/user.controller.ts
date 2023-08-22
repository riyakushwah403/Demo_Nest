import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Request,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserDto } from './Dto/userDto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger/dist';
import { UserService } from './user.service';
import { userUpdateDto } from './Dto/userUpdateDto';
import { JwtAuthGuard, AdminAuthGuard } from 'src/guard/AdminGuard';
import { request } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('findAll')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  getUsers() {
    console.log('Get All Users');

    return this.userService.findAll();
  }

  @Get('find/:id')
  @ApiBearerAuth()
 
  getOneUser(@Param('id') id: string)  {
    console.log(request['user']._id.toString());
    return this.userService.findById(id);
  }

  @Patch('update')
  @ApiBearerAuth()
  async updateUser(
    @Body() updateDto: userUpdateDto,
  ): Promise<userUpdateDto> {
    const updatedUser = await this.userService.update(request['user']._id.toString(), updateDto);
    console.log('update');
    console.log('user : ', request['user']._id.toString());
    console.log(updateDto);
    return updatedUser;
  }
  @Delete('delete')
  @ApiBearerAuth()
  deleteUser() {
    console.log('Delete User');
    return this.userService.delete(request['user']._id.toString());
  }
  @Delete('softdelete')
  @ApiBearerAuth()
  softdelete() {
    console.log('softDelete User');
    return this.userService.softDelete(request['user']._id.toString());
  }
}

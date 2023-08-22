import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './Dto/userDto';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Encrypt } from './encrypt';
import { userUpdateDto } from './Dto/userUpdateDto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    // console.log('Id>>>>', id);

    try {
      const user = await this.userModel.findById(id).exec();

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }

      return user;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }

  async update(id: string, updateUserDto: userUpdateDto): Promise<User> {
    const encryptInstance = new Encrypt();
    try {
      console.log('Update Api>>>>>>>>>>>>>');

      const user = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
      await encryptInstance.savePasswordHash(user.password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<String> {
    try {
      const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
      if (!deletedUser) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
      return 'User Deleted Successfully';
    } catch {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
  async softDelete(id: string): Promise<string> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, { IsActive: false }, { new: true })
        .exec();

      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }

      console.log('Updated user:', updatedUser);

      return 'User Soft Deleted Successfully';
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException(
        `Error soft deleting user with ID ${id}.`,
      );
    }
  }
}

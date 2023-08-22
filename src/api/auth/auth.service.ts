import { Injectable ,NotFoundException,ConflictException,UnauthorizedException} from '@nestjs/common';

import { UserDto } from '../user/Dto/userDto';
import { User,UserDocument } from '../user/schema/user.schema';
import { Encrypt } from '../user/encrypt';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { request } from 'express';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
      ) {}
    async create(user: UserDto): Promise<User> {
        const encryptInstance = new Encrypt();
        try {
          const existingUser = await this.userModel
            .findOne({ email: user.email })
            .exec();
    
          if (existingUser) {
            throw new ConflictException(
              `User with email ${user.email} already exists.`,
            );
          }
    
          const newUser = new this.userModel(user);
          newUser.password = await encryptInstance.savePasswordHash(user.password);
    
          return await newUser.save();
        } catch (error) {
          throw error;
        }
      }
    
      async login(email: string, password: string): Promise<string> {
        const encryptInstance = new Encrypt();
        const user = await this.userModel.findOne({ email }).exec();
        request['user'] = user;
        console.log('user : ', request['user']);
        if (!user) {
          throw new NotFoundException(`User with email ${email} not found.`);
        }
    
        const isPasswordValid = await encryptInstance.comparePassword(
          password,
          user.password,
        );
        console.log(user.role);
    
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid credentials.');
        }
    
        const payload = { email: user.email, sub: user._id };
        const token = this.jwtService.sign(payload, { expiresIn: '2m' }); 

        return token;
      }
}

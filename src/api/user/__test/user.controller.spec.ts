import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
// import { JwtAuthGuard } from '../guard/AdminGuard';
// import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mockUsers } from 'src/test/mock/user.mock';
// import { ConfigService } from '@nestjs/config';


describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let userModel: Model<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // describe('controller.getUsers', () => {
  //   it('should return an array of users', async () => {
  //     jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);
  //     const result = await controller.getUsers();
  //     expect(result).toEqual(mockUsers);
  //   });
  // });
});


  

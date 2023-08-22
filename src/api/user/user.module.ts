  import { Module, NestModule ,MiddlewareConsumer,RequestMethod} from '@nestjs/common';
  import { UserController } from './user.controller';
  import { UserService } from './user.service';
  import { MongooseModule } from '@nestjs/mongoose';
  import { User, UserSchema } from './schema/user.schema';
  import { JwtModule } from '@nestjs/jwt';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  import { JWTConfig } from 'src/config/jwt';
import { AuthMiddleware } from 'src/middleware/Auth.middleware';


  @Module({
    imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => JWTConfig(configService), 
        inject: [ConfigService],}),
      ConfigModule.forRoot({ isGlobal: true }), 
    ],
    controllers: [UserController],
    providers: [UserService],
  })
  export class UserModule  implements NestModule{
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(UserController); 
    }
  }

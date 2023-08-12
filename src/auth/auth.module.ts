import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from 'src/user/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { JWTConfig } from 'src/user/config/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => JWTConfig(configService), 
      inject: [ConfigService],}),
    ConfigModule.forRoot({ isGlobal: true }), 
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

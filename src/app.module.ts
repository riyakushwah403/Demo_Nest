import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBConfig } from './user/config/db';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        DBConfig(configService),
      inject: [ConfigService],
    }),
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

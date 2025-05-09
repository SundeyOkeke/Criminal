import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/user/auth.module';
import { AuthService } from 'src/user/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { CategoryModule } from 'src/categories/category.module';
import { CriminalModule } from 'src/criminal/criminal.module';
import * as dotenv from "dotenv"
import { JwtStrategy } from 'src/user/jwt.strategy';
dotenv.config()

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    CategoryModule,
    CriminalModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log("configService", configService.get<string>("JWT_SECRET"))
        return {
          secret: "agbado",
          signOptions: {
            ...(configService.get('JWT_EXPIRATION_TIME')
              ? {
                  expiresIn: configService.get('JWT_EXPIRATION_TIME') + 'd',
                }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [ ChatGateway, AuthService, JwtStrategy],
  exports: [ChatGateway],
})
export class ChatModule {}

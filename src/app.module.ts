import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./user/auth.module";
import { CategoryModule } from "./categories/category.module";
import { WeaponModule } from "./weapons/weapons.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    CategoryModule,
    WeaponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

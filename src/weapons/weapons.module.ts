import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import mongoose from "mongoose";
import { config } from "process";
import { WeaponSchema } from "./schema/weapons.schema";
import { WeaponsService } from "./weapons.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Weapon", schema: WeaponSchema }]),
  ],
  exports: [WeaponsService],
  providers: [WeaponsService],
})
export class WeaponModule {}

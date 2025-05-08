import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import mongoose from "mongoose";
import { config } from "process";
import { CriminalSchema } from "./schema/criminal.schema";
import { CriminalService } from "./criminal.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Criminal", schema: CriminalSchema }]),
  ],
  exports: [CriminalService],
  providers: [CriminalService],
})
export class CriminalModule {}

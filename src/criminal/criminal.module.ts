import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import mongoose from "mongoose";
import { config } from "process";
import { CriminalSchema } from "./schema/criminal.schema";
import { CriminalService } from "./criminal.service";
import { CriminalReportSchema } from "./schema/criminalRecord.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Criminal", schema: CriminalSchema }, { name: "CriminalReport", schema: CriminalReportSchema }]),
  ],
  exports: [CriminalService],
  providers: [CriminalService],
})
export class CriminalModule {}

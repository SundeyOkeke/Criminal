import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import mongoose from "mongoose";
import { config } from "process";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategorySchema } from "./schema/category.schema";
import { UnitSchema } from "./schema/unit.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Category", schema: CategorySchema },
      { name: "Unit", schema: UnitSchema },
    ]),
  ],
  controllers: [CategoryController],
  exports: [CategoryService],
  providers: [CategoryService],
})
export class CategoryModule {}

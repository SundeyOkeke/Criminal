import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Category } from "./schema/category.schema";
import { Unit, UnitDocument } from "./schema/unit.schema";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel("Category") private categoryModel: Model<Category>,
    @InjectModel("Unit") private UnitModel: Model<Unit> // private categoryModel: Model<Category>, // private UnitModel: Model<Unit>
  ) {}

  async createCategory(data) {
    return await this.categoryModel.create({ ...data });
  }

  async createUnit(data: CategoryDto) {
    const category = await this.categoryModel.findById(data.categoryId);
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    const unit = (await this.UnitModel.create({
      ...data,
      category: category._id,
    })) as UnitDocument;

    // Add the unit to the category's array of units (optional)
    category.units.push(unit);
    await category.save();

    return unit;
  }

  async getCategories() {
    return await this.categoryModel.find().populate("units");
  }

  async getUnits() {
    return await this.UnitModel.find().populate("category");
  }

  async findOneUnit(unit) {
    const findunit = await this.UnitModel.findById(unit).populate("category");
    return findunit;
  }
}

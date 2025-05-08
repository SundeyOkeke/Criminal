import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Criminal } from "./schema/criminal.schema";
import { CreateCriminalDto } from "./dto/crimina.dto";
import { User } from "src/user/schema/user.schema";

@Injectable()
export class CriminalService {
  constructor(@InjectModel("Criminal") private criminalModel: Model<Criminal>) {}

  async createCriminal(data: CreateCriminalDto, user: User) {
    return await this.criminalModel.create({ ...data, unit : user.unit._id, lockedBy : user._id });
  }

  async criminalRecords() {
    const criminals = await this.criminalModel.find().sort({ createdAt: -1 }).populate("lockedBy").populate("unit");
    return criminals.map((criminal) => ({
      ...criminal,
      unit : criminal.unit.name,
      lockedBy : criminal.lockedBy.name
    }))
  }
}

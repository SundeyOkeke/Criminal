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
import { CriminalReport } from "./schema/criminalRecord.schema";

@Injectable()
export class CriminalService {
  constructor(
    @InjectModel("Criminal") private criminalModel: Model<Criminal>,
    @InjectModel("CriminalReport") private criminalReportModel: Model<CriminalReport>
  ) {}

  async createCriminal(data: CreateCriminalDto, user: User) {
    return await this.criminalModel.create({ ...data, unit : user.unit._id, lockedBy : user._id });
  }

  async criminalRecords() {
    const criminals = await this.criminalModel.find().sort({ createdAt: -1 }).populate("lockedBy").populate("unit");
    return criminals.map((criminal) => ({
      _id : criminal._id,
      name : criminal.name,
      dob : criminal.dob,
      lockUpDate : criminal.lockUpDate,
      releaseDate : criminal.releaseDate,
      bvn : criminal.bvn,
      nin : criminal.nin,
      address : criminal.address,
      phoneNumber : criminal.phoneNumber,
      imageUrl : criminal.imageUrl,
      unit : criminal.unit.name,
      lockedBy : criminal.lockedBy.name,
      createdAt : criminal.createdAt
    }))
  }

  async criminalReport(reportText : string, user : User, reportTo : User[]) {
    reportTo = [user, ...reportTo]
   await Promise.all(
    reportTo.map(async (report) => {
      await this.criminalReportModel.create({
        report : reportText,
        reportedBy : user._id,
        unit : user.unit._id,
        reportTo : report._id
      })
    })
   )
   return reportTo
  }

  async getcriminalReport(userId) {
    const reports = await this.criminalReportModel.find({reportTo : userId}).sort({createdAt : -1}).populate("unit").populate("reportedBy")
    return Promise.all(
      reports.map((report) => ({
        _id : report._id,
        report : report.report,
        unit : report.unit.name,
        reportedBy : report.reportedBy.name,
        date : report.createdAt
      }))
    )
   }

   
}

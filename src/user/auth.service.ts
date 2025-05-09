import { Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserRole } from "./schema/user.schema";
import { JwtService } from "@nestjs/jwt";
import { CategoryService } from "src/categories/category.service";
import { AppointDto, CreateReportDto, LoginDto, RegisterDto } from "./dto/user.dto";
import { CriminalService } from "src/criminal/criminal.service";
import { Hash } from "src/utils/utils";
import { uploadToCloudinary } from "src/utils/multer";
import { CreateCriminalDto } from "src/criminal/dto/crimina.dto";
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private userModel: Model<User>,
    private jwtService: JwtService,
    private categoryService: CategoryService,
    private criminalService: CriminalService
  ) {}

  async register(data: RegisterDto) {
    const { name, serviceNumber, unitId, password } = data;

    if (unitId) {
      //check if email already exists
      const user = await this.userModel.findOne({ serviceNumber });
      if (user) {
        throw new UnauthorizedException("Service Number already exists");
      }

      const userUnit = await this.categoryService.findOneUnit(unitId);

      const createUser = await this.userModel.create({
        name,
        password: Hash.make(password),
        serviceNumber,
        unit: userUnit._id,
        categoryName: (userUnit.category as { name: string }).name,
      });

      return {
        _id : createUser._id,
        name : createUser.name,
        serviceNumber : createUser.serviceNumber,
        role : createUser.role,
        unit : userUnit.name,
        categoryName : (userUnit.category as { name: string }).name
      }
    }

    const createUser = await this.userModel.create({
      name: name,
      password: Hash.make(password),
      serviceNumber: serviceNumber,
      role: UserRole.SuperAdmin,
    });

    return {
      _id : createUser._id,
      name : createUser.name,
      serviceNumber : createUser.serviceNumber,
      role : createUser.role,
      unit : "Super Admin",
      categoryName : "Super Admin"
    }
  }

  async login(data: LoginDto) {
    const { serviceNumber, password } = data;

    const user = await this.userModel
      .findOne({ serviceNumber })
      .populate("unit")
      .populate("unit.category");

      console.log(user)

    if (!user) {
      throw new UnauthorizedException("Invalid Credentials");
    }
    const confirmPassword = Hash.compare(password, user.password);

    if (!confirmPassword) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const payload = {
      id: user._id,
      category: user.categoryName,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    const response  = {
      _id : user._id,
      name : user.name,
      serviceNumber : user.serviceNumber,
      role : user.role,
      unit : user.unit?.name ?? "Super Admin",
      categoryName : user.categoryName
    }

    return { token, response };
  }

  async appointDivisionComm(id, data: AppointDto) {
    const { userId } = data;
    const user = await this.userModel.findById(id);
    if (user.role === "Super Admin") {
      const user = await this.userModel.findById(userId);
        await this.userModel.findByIdAndUpdate(userId, {
          role: UserRole.DivisionCommander,
          categoryName : "Division"
        });
        return { message: "Successful" };
      
    }
  }

  async appointBrigadeComm(id, data: AppointDto) {
    const { userId } = data;
    const user = await this.userModel.findById(id);
    if (user.role === "Super Admin" || user.role === "Division Commander") {
      const user = await this.userModel.findById(userId);
        await this.userModel.findByIdAndUpdate(userId, {
          role: UserRole.BrigadeCommander,
          categoryName : "Brigade"
        });
        return { message: "Successful" };
      
    }
  }

  async appointBattalionComm(id, data: AppointDto) {
    const { userId } = data;
    const user = await this.userModel.findById(id);
    if (
      user.role === "Brigade Commander" ||
      user.role === "Division Commander" ||
      user.role === "Super Admin"
    ) {
      const user = await this.userModel.findById(userId).populate("unit");

      await this.userModel.findByIdAndUpdate(userId, {
        role: UserRole.UnitCommander,
        categoryName : "Battalion"
      });
      return { message: "Successful" }
    }
  }

  async decodeToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async getUserById(id) {
    return await this.userModel.findById(id).populate("unit");
  }


  async getAllUsers() {
    return await this.userModel.find();
  }

  async getAllUnitUsers(id: string) {
    const user = await this.userModel.findById(id).populate("unit");
    const [unitMember, commanders] = await Promise.all([
      this.userModel.find({ unit: user.unit._id }),
      this.userModel.find({   role: { $in: [UserRole.UnitCommander, UserRole.DivisionCommander, UserRole.BrigadeCommander] },
      })
    ])
    const response = user.role === UserRole.UnitCommander || user.role === UserRole.BrigadeCommander || user.role === UserRole.DivisionCommander ? [...unitMember, ...commanders] : unitMember
    return response.filter((data) => data._id.toString() !== id.toString())
  }

  async uploadFiles(files) {
    try {
      const mediaURLs = [];

      if (!files) {
        throw new NotAcceptableException('Upload an image');
      }

      const imageFiles = files.media;

      // Check if imageFiles is an array
      if (!Array.isArray(imageFiles)) {
        throw new NotAcceptableException('Expected an array of images');
      }

      const folderName = 'Criminal';

      await Promise.all(
        imageFiles.map(async (data) => {
          const upload = await uploadToCloudinary(data, folderName);
          mediaURLs.push(upload.secure_url);
        }),
      );
      return { mediaURLs: mediaURLs };
    } catch (error) {
      throw error;
    }
  }

  async createCriminal(data: CreateCriminalDto, id: string) {
    const user = await this.userModel.findById(id).populate("unit");
    return await this.criminalService.createCriminal(data,user )
  }

  async criminalRecords() {
    return await this.criminalService.criminalRecords()
  }

  async getUserFromSocket(socket: Socket) {
    let authHeader: any = socket.handshake.auth;

    let auth_token =
      authHeader.authorization ?? socket.handshake.headers.authorization;

    if (!auth_token) {
      throw new WsException('Unauthorised or Expired session');
    }
    auth_token = auth_token.split(' ')[1];

    const user = await this.decodeToken(auth_token);

    if (!user) {
      throw new WsException('Invalid credentials.');
    }

    return user;
  }

  async criminalReport(data : CreateReportDto, id: string) {
    const user = await this.getUserById(id)
    const reportTo = await Promise.all(
      data.reportToIds.map(async (reportToId) => {
        const user = await this.getUserById(reportToId)
        return user
      })
    )
    return await this.criminalService.criminalReport(data.report, user, reportTo)
  }

  async getcriminalReport(id: string) {
    return await this.criminalService.getcriminalReport(id)
  }

}

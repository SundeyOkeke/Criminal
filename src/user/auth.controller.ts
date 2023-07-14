import {
  Body,
  Controller,
  Post,
  Param,
  Put,
  UseGuards,
  Req,
  Get,
  Patch,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AppointCommDto, LoginDto, RegisterDto, userIdDto } from "./dto/user.dto";
import { JwtAuthGuard } from "guards/jwt-auth.guard";
import { CategoryWeaponDto, WeaponDto, approveWeaponDto, signoutWeaponDto } from "src/weapons/dto/weapons.dto";
import { WeaponsService } from "src/weapons/weapons.service";

@Controller("user")
export class AuthController {
  constructor(
    private authService: AuthService,
    private weaponsService: WeaponsService
    ) {}

  @Post("/register")
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post("/login")
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Put("/appoint/division/comm")
  @UseGuards(JwtAuthGuard)
  appointDivisionComm(@Req() req, @Body() data: AppointCommDto) {
    const id: string = req.user.id;
    return this.authService.appointDivisionComm(id, data);
  }

  @Put("/appoint/brigade/comm")
  @UseGuards(JwtAuthGuard)
  appointBrigadeComm(@Req() req, @Body() data: AppointCommDto) {
    const id: string = req.user.id;
    return this.authService.appointBrigadeComm(id, data);
  }

  @Put("/appoint/battalion/comm")
  @UseGuards(JwtAuthGuard)
  appointBattalionComm(@Req() req, @Body() data: AppointCommDto) {
    const id: string = req.user.id;
    return this.authService.appointBattalionComm(id, data);
  }

  @Post("/register/weapon")
  @UseGuards(JwtAuthGuard)
  registerWeapon(@Req() req, @Body() data: WeaponDto) {
    const id: string = req.user.id;
    return this.authService.registerWeapon(id, data);
  }

  @Get("/get/weapon")
  @UseGuards(JwtAuthGuard)
  getWeapons(@Req() req, @Body() data: CategoryWeaponDto) {
    const id: string = req.user.id;
    return this.authService.getWeapons(id, data);
  }

  @Post("/signout/weapon")
  @UseGuards(JwtAuthGuard)
  signoutWeapon(@Req() req, @Body() data: signoutWeaponDto) {
    const id: string = req.user.id;
    return this.authService.signoutWeapon(id, data);
  }

  @Get("/get/user")
  @UseGuards(JwtAuthGuard)
  getUserById(@Req() req) {
    const id: string = req.user.id;
    return this.authService.getUserById(id);
  }

  @Get("/weapons/await-approval")
  @UseGuards(JwtAuthGuard)
  weaponsAwaitApproval(@Req() req) {
    const id: string = req.user.id;
    return this.authService.weaponsAwaitApproval(id);
  }

  @Patch("/approve/weapon")
  @UseGuards(JwtAuthGuard)
  approveWeapon(@Req() req, @Body() data: approveWeaponDto) {
    const id: string = req.user.id;
    return this.authService.approveWeapon(id,data);
  }

  @Get("/weapon/history")
  @UseGuards(JwtAuthGuard)
  weaponHistory(@Req() req) {
    const id: string = req.user.id;
    return this.authService.weaponHistory(id);
  }

  @Get("/all/users")
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('/get/user-id/:userId')
@UseGuards(JwtAuthGuard)
getUserByProvidedId(@Param('userId') userId: string) {
  return this.authService.getUserById(userId);
}
}

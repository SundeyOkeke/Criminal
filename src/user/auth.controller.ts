import { Body, Controller, Post, Param, Put, UseGuards, Req, Get, Patch, NotAcceptableException, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AppointDto, LoginDto, RegisterDto, userIdDto } from "./dto/user.dto";
import { JwtAuthGuard } from "guards/jwt-auth.guard";
import { CriminalService } from "src/criminal/criminal.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateCriminalDto } from "src/criminal/dto/crimina.dto";

@ApiTags("User Authentication")
@Controller("user")
export class AuthController {
  constructor(
    private authService: AuthService,
    private criminalService: CriminalService
  ) {}

  @Post("/register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User registered successfully." })
  @ApiBody({ type: RegisterDto })
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post("/login")
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "User logged in successfully." })
  @ApiBody({ type: LoginDto })
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Put("/appoint/division-comm")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Appoint a division commander" })
  @ApiResponse({ status: 200, description: "Division commander appointed." })
  @ApiBody({ type: AppointDto })
  appointDivisionComm(@Req() req, @Body() data: AppointDto) {
    const id: string = req.user.id;
    return this.authService.appointDivisionComm(id, data);
  }

  @Put("/appoint/brigade-comm")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Appoint a brigade commander" })
  @ApiResponse({ status: 200, description: "Brigade commander appointed." })
  @ApiBody({ type: AppointDto })
  appointBrigadeComm(@Req() req, @Body() data: AppointDto) {
    const id: string = req.user.id;
    return this.authService.appointBrigadeComm(id, data);
  }

  @Put("/appoint/battalion-comm")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Appoint a battalion commander" })
  @ApiResponse({ status: 200, description: "Battalion commander appointed." })
  @ApiBody({ type: AppointDto })
  appointBattalionComm(@Req() req, @Body() data: AppointDto) {
    const id: string = req.user.id;
    return this.authService.appointBattalionComm(id, data);
  }

  @Get("/get/user")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, description: "User data retrieved." })
  getUserById(@Req() req) {
    const id: string = req.user.id;
    return this.authService.getUserById(id);
  }

  @Get("/all/users")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of all users." })
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get("/all/unit-users")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all unit users" })
  @ApiResponse({ status: 200, description: "List of unit users." })
  getAllUnitUsers(@Req() req) {
    const id: string = req.user.id;
    return this.authService.getAllUnitUsers(id);
  }

  @Get("criminal-records")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all Criminal Records" })
  @ApiResponse({ status: 200, description: "List of unit users." })
  criminalRecords() {
    return this.authService.criminalRecords();
  }

  @Post("criminal-record")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all unit users" })
  @ApiResponse({ status: 200, description: "List of unit users." })
  createCriminal(@Body() data: CreateCriminalDto,@Req() req) {
    const id: string = req.user.id;

    return this.authService.createCriminal(data, id);
  }

  @UseInterceptors(FileFieldsInterceptor([{ name: 'media', maxCount: 5 }]))
  @Post('upload-files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        media: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The image has been successfully uploaded.',
  })
  @ApiResponse({ status: 406, description: 'Not Acceptable: Error message.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async uploadFiles(@UploadedFiles() files) {
    try {
      const upload = await this.authService.uploadFiles(files);
      return upload;
    } catch (error) {
      if (error?.status >= 400 && error?.status < 500) {
        throw new NotAcceptableException(error?.message);
      }

      throw error;
    }
  }

}

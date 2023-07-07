import { Body, Controller, Post, Param, Put, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppointCommDto, LoginDto, RegisterDto } from './dto/user.dto';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';


@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('/login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Put('/appoint/division/comm')
  @UseGuards(JwtAuthGuard)
  appointDivisionComm( @Req() req, @Body() data: AppointCommDto) {
    const id: string = req.user.id;
    return this.authService.appointDivisionComm(id, data);
  }

  @Put('/appoint/brigade/comm')
  @UseGuards(JwtAuthGuard)
  appointBrigadeComm( @Req() req, @Body() data: AppointCommDto) {
    const id: string = req.user.id;
    return this.authService.appointBrigadeComm(id, data);
  }

  @Put('/appoint/battalion/comm')
  @UseGuards(JwtAuthGuard)
  appointBattalionComm( @Req() req, @Body() data: AppointCommDto) {
    const id: string = req.user.id;
    return this.authService.appointBattalionComm(id, data);
  }

  
}

import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import type { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequestDto,
  ) {
    return await this.userService.register(res, dto);
  }

  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequestDto,
  ) {
    return await this.userService.login(res, dto);
  }

  @Post('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    return await this.userService.refresh(req, res);
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    return await this.userService.logout(res);
  }
}

import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import type { Response, Request } from 'express';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';

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
    const token = await this.userService.refresh(req, res);
    return res.status(200).json(token);
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    return await this.userService.logout(res);
  }

  @Authorization()
  @Get('/profile')
  async profile(@Authorized('id') id: string) {
    return await this.userService.profile(id);
  }
}

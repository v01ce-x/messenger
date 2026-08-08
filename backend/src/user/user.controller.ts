import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import type { Response, Request } from 'express';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAvatarPipe } from './pipes/upload-avatar.pipe';

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

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @Authorization()
  async uploadAvatar(
    @UploadedFile(UploadAvatarPipe) file: Express.Multer.File,
    @Authorized('id') currentUserId: string,
  ) {
    return await this.userService.uploadUserFile(file, currentUserId, 'avatar');
  }

  @Post('/cover')
  @UseInterceptors(FileInterceptor('cover'))
  @Authorization()
  async uploadCover(
    @UploadedFile(UploadAvatarPipe) file: Express.Multer.File,
    @Authorized('id') currentUserId: string,
  ) {
    return await this.userService.uploadUserFile(file, currentUserId, 'cover');
  }
}

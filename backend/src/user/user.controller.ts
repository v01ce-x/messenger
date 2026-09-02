import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import type { Response, Request } from 'express';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { UploadAvatarPipe } from './pipes/upload-avatar.pipe';
import { EditableDataDto } from './dto/editable-data.dto';

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
    await this.userService.logout(res);
    return res.status(200).json({ success: true });
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

  @Patch('profile')
  @Authorization()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  async editProfile(
    @Authorized('id') currentUserId: string,
    @Body() dto: EditableDataDto,
    @UploadedFiles()
    files: { avatar?: Express.Multer.File[]; cover?: Express.Multer.File[] },
  ) {
    const avatarFile = files.avatar?.[0];
    const coverFile = files.cover?.[0];

    return await this.userService.editProfile(
      currentUserId,
      dto,
      avatarFile,
      coverFile,
    );
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequestDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginRequestDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt.interface';
import type { StringValue } from 'ms';
import type { Response, Request } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private readonly JWT_ACCESS_TOKEN_TTL: StringValue;
  private readonly JWT_REFRESH_TOKEN_TTL: StringValue;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      expires,
      secure: false,
      sameSite: 'lax',
    });
  }

  private auth(res: Response, id: string, remember: boolean) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    if (remember) {
      this.setCookie(
        res,
        refreshToken,
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      );
    }

    return {
      accessToken,
    };
  }

  async validate(id: string) {
    const user = this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async register(res: Response, dto: RegisterRequestDto) {
    const existUser = await this.prismaService.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (existUser) {
      throw new ConflictException('Пользователь с такой почтой уже существует');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        password: passwordHash,
      },
    });

    return this.auth(res, user.id, true);
  }

  async login(res: Response, dto: LoginRequestDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Неверные данные почты или пароля');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверные данные почты или пароля');
    }

    return this.auth(res, user.id, dto.remember);
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'] as string;

    if (!refreshToken) {
      await this.logout(res);
      throw new UnauthorizedException('Ваша сессия истекла');
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (!Object.keys(payload)) return;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return this.auth(res, user.id, true);
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
  }

  async profile(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        firstName: true,
        lastName: true,
        middleName: true,
        login: true,
        avatar: true,
        cover: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  private saveFileToDisk(file: Express.Multer.File, prefix: string): string {
    const uploadDir = path.join(process.cwd(), 'static');

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    const fileName = `${prefix}-${uniqueSuffix}${fileExt}`;

    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);

    return `/static/${fileName}`;
  }

  async uploadUserFile(
    file: Express.Multer.File,
    currentUserId: string,
    prefix: 'avatar' | 'cover',
  ) {
    if (!file) {
      throw new BadRequestException('Файл не переждан');
    }

    const fileUrl = this.saveFileToDisk(file, prefix);

    await this.prismaService.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        [prefix]: fileUrl,
      },
    });

    return {
      success: true,
    };
  }
}

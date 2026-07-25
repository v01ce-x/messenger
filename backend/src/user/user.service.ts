import {
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

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );

    return {
      accessToken,
      refreshToken,
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
        email: dto.email,
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

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequestDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Неверные данные почты или пароля');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверные данные почты или пароля');
    }

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'] as string;

    if (!refreshToken) {
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

    return this.auth(res, user.id);
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
  }
}

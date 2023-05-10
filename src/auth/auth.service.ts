import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User as UserModel } from '@prisma/client';
import { UserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async validateUserByJwtPayload(payload: any): Promise<UserModel> {
    const { sub: userId } = payload;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return user;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async register(dto: UserDto) {
    const hash = await argon.hash(dto.password);
    if (dto.password === dto.confirmPassword) {
      try {
        const user = await this.prisma.user.create({
          data: {
            email: dto.email,
            password: hash,
            confirmPassword: dto.confirmPassword,
            username: dto.username,
            roleCode: (dto.roleCode as Role) || Role.USER,
          },
        });
        delete user.password;
        delete user.confirmPassword;
        return user;
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken');
          }
        }
        throw error;
      }
    } else {
      throw new ForbiddenException('confirm password incorrect');
    }
  }

  async login(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Credentials incorrect');
      }
      // const pwMatches = await argon.verify('$' + user.password, dto.password);
      if (!user.password) throw new ForbiddenException('Credentials incorrect');

      return this.signToken(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  async signToken(
    user: UserModel,
    // userId: string,
    // email: string,
  ): Promise<{ access_token: string; user: UserModel }> {
    const payload = {
      sub: user.id,
      roleCode: user.roleCode,
    };

    delete user.password;
    delete user.confirmPassword;

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '10h',
      secret: secret,
    });

    return {
      user,
      access_token: token,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUserData(userId: string, dto: UpdateUserDto) {
    const user = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        birth: dto.birth,
        gender: dto.gender,
        phoneNumber: dto.phoneNumber,
      },
    });
    delete (await user).password;
    delete (await user).confirmPassword;
    return user;
  }

  async getAllUsers() {
    const list = await this.prisma.user.findMany({});
    const newList = list.map((user) => {
      delete user.password;
      delete user.confirmPassword;
      return user;
    });
    return newList;
  }

  findUser(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }
}

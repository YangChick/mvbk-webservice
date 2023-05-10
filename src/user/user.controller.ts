import { Body, Controller, Param, Put, Get } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put('updateUserData/:id')
  updateUserData(@Param('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUserData(userId, dto);
  }

  @Get('list')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}

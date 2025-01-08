import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

import { User } from '@prisma/client';
import { EdituserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userSerive: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  async editUser(@GetUser('id') userId: number, @Body() dto: EdituserDto) {
    return this.userSerive.edituser(userId, dto);
  }
}

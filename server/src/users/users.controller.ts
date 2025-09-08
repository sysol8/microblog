import {
  UserRegisterDto,
  type UserRegisterResponse,
} from './dtos/user-register.dto';
import { UserUpdateDto, type UserUpdateResponse } from './dtos/user-update.dto';
import { UserLoginDto, type UserLoginResponse } from './dtos/user-login.dto';
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('register')
  @HttpCode(201)
  create(@Body() dto: UserRegisterDto): UserRegisterResponse {
    throw new Error('Not implemented')
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    throw new Error('Not implemented')
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param(':id', ParseUUIDPipe) id: string,
    @Body() dto: UserUpdateDto,
  ): UserUpdateResponse {
    throw new Error('Not implemented')
  }
}

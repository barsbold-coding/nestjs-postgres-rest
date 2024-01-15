import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryDto } from 'globals/dto/query.dto';
import { AuthGuard } from 'guards/auth.guard';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() query: QueryDto) {
    return await this.userService.findAll(query);
  }

  @Post()
  async create(@Body() data: UserDto) {
    return await this.userService.create(data);
  }
}

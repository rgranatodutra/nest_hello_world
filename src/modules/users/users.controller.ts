import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { };

  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  };

  @Get()
  public async findAll() {
    return this.usersService.findAll();
  };

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  };

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  };

  @Patch(':id/deactivate')
  public async deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(id);
  };

  @HttpCode(204)
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  };
};

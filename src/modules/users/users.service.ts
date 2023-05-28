import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) { };

  public async create(data: CreateUserDto) {
    const findUser = await this.usersRepository.getOneByLogin(data.login);
    if (findUser) throw new ConflictException("Login already exists.");

    const newUser = await this.usersRepository.create(data);
    return newUser;
  };

  public async findAll() {
    const allUsers = await this.usersRepository.getAll();
    return allUsers;
  };

  public async findOne(id: string) {
    const findUser = await this.usersRepository.getOneById(id);
    if (!findUser) throw new NotFoundException("User not found.");
    return findUser;
  };

  public async update(id: string, data: UpdateUserDto) {
    const findUser = await this.usersRepository.getOneById(id);
    if (!findUser) throw new NotFoundException("User not found.");

    const updatedUser = await this.usersRepository.update(id, data);
    
    return updatedUser;
  };

  public async deactivate(id: string) {
    const findUser = await this.usersRepository.getOneById(id);
    if (!findUser) throw new NotFoundException("User not found.");

    const deactivatedUser = await this.usersRepository.deactivate(id);
    
    return deactivatedUser;
  };

  public async remove(id: string) {
    await this.usersRepository.delete(id);
    return;
  };
};

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UsersRepository {
    abstract create(data: CreateUserDto): Promise<User> | User;
    abstract getAll(): Promise<Array<User>> | Array<User>;
    abstract getOneById(id: string): Promise<User> | User;
    abstract update(id: string, data: UpdateUserDto): Promise<User> | User;
    abstract deactivate(id: string): Promise<User> | User;
    abstract delete(id: string): Promise<void> | void;
};
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { UsersRepository } from "./users.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersInMemoryRepository implements UsersRepository {

    private memoryDB: Array<User> = [];

    public create(data: CreateUserDto): User | Promise<User> {
        const newUser = new User();
        Object.assign(newUser, { ...data });
        this.memoryDB.push(newUser);

        return plainToInstance(User, newUser);
    };

    public getAll(): User[] | Promise<User[]> {
        return plainToInstance(User, this.memoryDB);
    };

    public getOneById(id: string): User | Promise<User> {
        const findUser = this.memoryDB.find(u => u.id === id);
        
        return plainToInstance(User, findUser);
    };

    public getOneByLogin(login: string): User | Promise<User> {
        const findUser = this.memoryDB.find(u => u.login === login);
        
        return plainToInstance(User, findUser);
    };

    public update(id: string, data: UpdateUserDto ): User | Promise<User> {
        const findUserIndex = this.memoryDB.findIndex(u => u.id === id);
        
        this.memoryDB[findUserIndex] = { 
            ...this.memoryDB[findUserIndex],
            ...data,
            updatedAt: new Date()
        };

        return plainToInstance(User, this.memoryDB[findUserIndex]);
    };

    public deactivate(id: string): User | Promise<User> {
        const findUserIndex = this.memoryDB.findIndex(u => u.id === id);

        this.memoryDB[findUserIndex].active = false;
        this.memoryDB[findUserIndex].deactivatedAt = new Date();

        return plainToInstance(User, this.memoryDB[findUserIndex]);
    };

    public delete(id: string): void | Promise<void> {
        const findUserIndex = this.memoryDB.findIndex(u => u.id === id);
        
        this.memoryDB.splice(findUserIndex, 1);
    };
};
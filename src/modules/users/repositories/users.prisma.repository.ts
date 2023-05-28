import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { PrismaService } from "src/database/prisma.service";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
    constructor(private prisma: PrismaService) { };

    public async create(data: CreateUserDto): Promise<User> {
        const user = new User();
        Object.assign(User, data);

        const newUser = await this.prisma.user.create({ data: user });

        return plainToInstance(User, newUser);
    };

    public async getAll(): Promise<User[]> {
        const allUsers = await this.prisma.user.findMany();

        return plainToInstance(User, allUsers);
    };

    public async getOneById(id: string): Promise<User> {
        const findUser = await this.prisma.user.findUnique({ where: { id: id } });

        return plainToInstance(User, findUser);
    };

    public async getOneByLogin(login: string): Promise<User> {
        const findUser = await this.prisma.user.findUnique({ where: { login: login } });

        return plainToInstance(User, findUser);
    };

    public async update(id: string, data: UpdateUserDto): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: { id: id },
            data: data
        });

        return plainToInstance(User, updatedUser);
    };

    public async deactivate(id: string): Promise<User> {
        const deactivatedUser = await this.prisma.user.update({
            where: { id: id },
            data: {
                deactivatedAt: new Date(),
                active: false
            }
        });

        return plainToInstance(User, deactivatedUser);
    };

    public async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id: id }
        });
    };
};
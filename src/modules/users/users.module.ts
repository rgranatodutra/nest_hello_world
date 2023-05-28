import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersInMemoryRepository } from './repositories/users.memory.repository';
import { UsersPrismaRepository } from './repositories/users.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: process.env.USE_PRISMA === "TRUE" ? UsersPrismaRepository : UsersInMemoryRepository
    }
  ]
})
export class UsersModule { };
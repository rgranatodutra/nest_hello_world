import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { SongsRepository } from './repositories/songs.repository';
import { SongsInMemoryRepository } from './repositories/songs.memory.repository';
import { SongsPrismaRepository } from './repositories/songs.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    PrismaService,
    {
      provide: SongsRepository,
      useClass: process.env.USE_PRISMA === "TRUE" ? SongsPrismaRepository : SongsInMemoryRepository
    }
  ]
})
export class SongsModule { };

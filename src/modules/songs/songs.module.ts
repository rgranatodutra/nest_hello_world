import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { SongsRepository } from './repositories/songs.repository';
import { SongsInMemoryRepository } from './repositories/songs.memory.repository';

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    {
      provide: SongsRepository,
      useClass: SongsInMemoryRepository
    }
  ]
})
export class SongsModule { };

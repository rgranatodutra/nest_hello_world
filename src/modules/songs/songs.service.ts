import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { SongsRepository } from './repositories/songs.repository';

@Injectable()
export class SongsService {
  constructor(private songsRepository: SongsRepository) { };

  public async create(data: CreateSongDto) {
    const newSong = await this.songsRepository.create(data);
    return newSong;
  };

  public async getAll(group: string | undefined) {
    const allSongs = this.songsRepository.getAll(group);
    return allSongs;
  };

  public async getOne(id: string) {
    const findSong = this.songsRepository.getOneById(id);
    return findSong
  };
};
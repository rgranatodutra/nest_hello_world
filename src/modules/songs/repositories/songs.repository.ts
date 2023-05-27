import { CreateSongDto } from "../dto/create-song.dto";
import { Song } from "../entities/song.entity";

export abstract class SongsRepository {
    abstract create(data: CreateSongDto): Promise<Song> | Song;
    abstract getAll(group: string | undefined): Promise<Array<Song> | Object> | Array<Song> | Object;
    abstract getOneById(id: string): Promise<Song> | Song;
};
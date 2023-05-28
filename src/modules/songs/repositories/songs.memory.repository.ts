import { Injectable } from "@nestjs/common";
import { SongsRepository } from "./songs.repository";
import { CreateSongDto } from "../dto/create-song.dto";
import { Song } from "../entities/song.entity";
import { plainToInstance } from "class-transformer";

Injectable()
export class SongsInMemoryRepository implements SongsRepository {
    private memoryDB: Array<Song> = [];

    public async create(data: CreateSongDto): Promise<Song> {
        const newSong = new Song();
        Object.assign(newSong, data);
        this.memoryDB.push(newSong);

        return plainToInstance(Song, newSong);
    };

    public async getAll(groupParameter: string | undefined): Promise<Song[] | Object> {
        if(groupParameter){
            // Mapeia todas as possíblidades do parametro - ex: todos artistas se agrupado por artistas;
            const groupSet = new Set(this.memoryDB.map(s => s[groupParameter])) as Set<string>;

            let groupedReturn = {};

            // Para cada grupo, filtra as músicas do respectivo grupo e insere dentro de uma chave no objeto de retorno;
            groupSet.forEach(group => {
                groupedReturn[group] = plainToInstance(Song, this.memoryDB.filter(s => s[groupParameter] === group));
            });

            return groupedReturn;
        };

        return plainToInstance(Song, this.memoryDB);
    };

    public async getOneById(id: string): Promise<Song> {
        const findSong = this.memoryDB.find(s => s.id === id);
        if (!findSong) throw new Error('Song not found.');

        return plainToInstance(Song, findSong);
    };
};
import { Injectable } from "@nestjs/common";
import { SongsRepository } from "./songs.repository";
import { CreateSongDto } from "../dto/create-song.dto";
import { Song } from "../entities/song.entity";
import { plainToInstance } from "class-transformer";
import { PrismaService } from "src/database/prisma.service";

Injectable()
export class SongsPrismaRepository implements SongsRepository {
    constructor(private prisma: PrismaService) { };

    public async create(data: CreateSongDto): Promise<Song> {
        const song = new Song();
        Object.assign(song, data);
        const newSong = await this.prisma.song.create({
            data: {
                id: song.id,
                album: song.album,
                artist: song.artist,
                genre: song.genre,
                name: song.name,
                song_url: song.song_url,
                year: String(song.year),
                cover_image: song.cover_image,
                userId: song.user_id
            }
        });

        return plainToInstance(Song, newSong);
    };

    public async getAll(groupParameter: string | undefined): Promise<Song[] | Object> {
        const allSongs = await this.prisma.song.findMany();

        if (groupParameter) {
            const groupSet = new Set(allSongs.map(s => s[groupParameter])) as Set<string>;

            let groupedReturn = {};

            groupSet.forEach(group => {
                groupedReturn[group] = plainToInstance(Song, allSongs.filter(s => s[groupParameter] === group));
            });

            return groupedReturn;
        };

        return plainToInstance(Song, allSongs);
    };

    public async getOneById(id: string): Promise<Song> {
        const findSong = this.prisma.song.findUnique({ where: { id: id } });

        return plainToInstance(Song, findSong);
    };
};
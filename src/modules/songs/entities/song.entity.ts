import { randomUUID } from "crypto";

export class Song {
    readonly id: string;
    user_id: string;
    name: string;
    album: string;
    artist: string;
    genre: string;
    year: number;
    cover_image: string | null;
    song_url: string | null;

    constructor() {
        this.id = randomUUID();
    };
};

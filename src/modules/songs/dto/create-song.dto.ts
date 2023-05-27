import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    album: string;

    @IsString()
    @IsNotEmpty()
    artist: string;

    @IsString()
    @IsNotEmpty()
    genre: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    year: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    cover_image: string | null;

    @IsString()
    @IsNotEmpty()
    song_url: string | null;
};

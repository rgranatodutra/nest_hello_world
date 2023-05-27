import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Post()
  public async create(@Body() data: CreateSongDto) {
    return this.songsService.create(data);
  };

  @Get()
  public async getAll(@Query('group') group: string | undefined) {
    return await this.songsService.getAll(group);
  };

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    return this.songsService.getOne(id);
  };
};

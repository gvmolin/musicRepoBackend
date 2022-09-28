import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMusicDto: CreateMusicDto) {
    return await this.musicsService.create(createMusicDto);
  }

  @Get()
  findAll() {
    return this.musicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicsService.findMusic(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicsService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicsService.remove(+id);
  }
}

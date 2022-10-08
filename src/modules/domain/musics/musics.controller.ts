import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpStatus } from '@nestjs/common';
import { multerAudioOptions } from 'src/core/common/interceptors/img-file.interceptor';
import { PaginationQuery } from 'src/core/common/utils/pagination-program';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK || HttpStatus.UNPROCESSABLE_ENTITY)
  @UseInterceptors(FileInterceptor('file', multerAudioOptions))
  create(@Body() body: CreateMusicDto, @UploadedFile() file) {
    body.file = file.filename;
    return this.musicsService.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: PaginationQuery) {
    console.log(query);
    return this.musicsService.findAll(query);
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

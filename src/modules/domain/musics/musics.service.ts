import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './entities/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
  ) {}

  async create(createMusicDto: CreateMusicDto) {
    try {
      const exists = await this.findMusic(createMusicDto);
      if (!exists) {
        await this.musicRepository.save(createMusicDto);
        console.log('music created');
      } else {
        console.log('ERROR music name already in use');
        return;
      }
      //
    } catch (error) {
      console.log('error on create music');
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all musics`;
  }

  async findMusic(param): Promise<Music> {
    try {
      console.log('searching music');
      const result = await this.musicRepository.findOneOrFail({ where: param });
      if (result) {
        console.log('found');
        return result;
      } else {
        console.log('music not found');
      }
    } catch (error) {}
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  remove(id: number) {
    return `This action removes a #${id} music`;
  }
}

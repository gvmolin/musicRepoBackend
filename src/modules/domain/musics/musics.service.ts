import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './entities/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
  ) {}

  async create(music: CreateMusicDto) {
    try {
      // musicsArr.forEach(async (music: CreateMusicDto) => {
      const res = await this.musicRepository.save(music);
      console.log(`>>> Music '${music.name}' created.`);
      // });
      return new HttpException(res, 201);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    try {
      return this.musicRepository.find({
        relations: ['album'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findMusic(param): Promise<Music> {
    try {
      console.log(`>>> Searching ${param} music`);
      const result = await this.musicRepository.findOneOrFail({ where: param });
      if (result) {
        console.log(`>>> Music '${param}' found`);
        return result;
      } else {
        console.log(`>>> Music '${param}' not found`);
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

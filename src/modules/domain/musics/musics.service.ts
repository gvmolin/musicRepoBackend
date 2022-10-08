import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './entities/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import {
  paginator,
  PaginationQuery,
} from 'src/core/common/utils/pagination-program';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
  ) {}

  async create(music: CreateMusicDto) {
    try {
      const res = await this.musicRepository.save(music);
      console.log(`>>> Music '${music.name}' created.`);
      return new HttpException(res, 201);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(query: PaginationQuery) {
    try {
      const pagination = paginator(query);
      const res = await this.musicRepository.findAndCount({
        relations: { album: true },
        ...pagination,
      });
      console.log(res);
      return {
        result: [...res[0]],
        pagination: {
          page: query.page,
          limit: query.limit,
          totalItems: res[1],
          totalPages: Math.ceil(res[1] / query.limit),
        },
      };
      // return this.musicRepository
      //   .createQueryBuilder('musics')
      //   .leftJoinAndSelect('musics.album', 'album')
      //   .skip(pagination.skip)
      //   .limit(pagination.take)
      //   .where
      //   .getMany();
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

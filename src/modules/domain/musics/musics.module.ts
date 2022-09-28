import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { Music } from './entities/music.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Music])],
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}

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
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CurrentUser } from 'src/core/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { multerOptions } from 'src/core/common/interceptors/img-file.interceptor';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED || HttpStatus.UNPROCESSABLE_ENTITY)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  create(
    @Body() body: CreateAlbumDto,
    @CurrentUser() user: any,
    @UploadedFile() file,
  ) {
    console.log(body);
    console.log(file);
    body.createdBy = user;
    body.cover = file.filename;
    return this.albumsService.create(body);
  }

  @Post('cover') //just testing
  @UseInterceptors(FileInterceptor('file', multerOptions))
  createFile(@UploadedFile() file, @Body() body) {
    console.log(body);
    console.log(file);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(+id);
  }
}

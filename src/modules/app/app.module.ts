import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../domain/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../domain/auth/auth.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { MusicsModule } from '../domain/musics/musics.module';
import { AlbumsModule } from '../domain/albums/albums.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MusicsModule,
    AlbumsModule,
    InfrastructureModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

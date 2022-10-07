import { BaseEntity } from 'src/core/common/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';

@Entity()
export class Music extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  file: string;

  @ManyToOne(() => Album, (album) => album.id)
  @Column({ nullable: false })
  @JoinColumn({ name: 'album' })
  album: Album;
}

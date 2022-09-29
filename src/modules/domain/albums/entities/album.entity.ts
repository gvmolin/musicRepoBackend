import { BaseEntity } from 'src/core/common/base.entity';
import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Music } from '../../musics/entities/music.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Album extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  cover: string;

  @OneToMany(() => Music, (music) => music.id)
  @JoinColumn({ name: 'name' })
  musics: Music[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user' })
  createdBy: User[];
}

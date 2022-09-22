import {
  BaseEntity as TypeOrmBaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'criado_em',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'atualizado_em',
  })
  updated: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deletado_em',
  })
  deleted: Date;

  @Column({ nullable: true, type: 'uuid' })
  atualizadoPor: Uuid;
}

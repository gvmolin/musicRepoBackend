import { BaseEntity } from 'src/core/common/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Music extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  filePath: string;
}

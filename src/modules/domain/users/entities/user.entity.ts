import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/core/common/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  description?: string;
}

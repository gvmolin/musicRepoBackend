import { BaseEntity } from 'src/core/common/base.entity';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateUserDto extends BaseEntity {
  @JoiSchema(Joi.string().required())
  username: Uuid;

  @JoiSchema(Joi.string().required())
  password: string;

  @JoiSchema(Joi.string().optional().allow(null))
  description?: string;
}

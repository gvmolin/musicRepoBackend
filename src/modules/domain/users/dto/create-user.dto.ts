import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateUserDto {
  @JoiSchema(Joi.string().required())
  username: string;

  @JoiSchema(Joi.string().required())
  password: string;

  @JoiSchema(Joi.string().optional().allow(null))
  description?: string;
}

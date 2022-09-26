import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class AuthDto {
  @JoiSchema(Joi.string().required())
  username: string;

  @JoiSchema(Joi.string().required())
  password: string;
}

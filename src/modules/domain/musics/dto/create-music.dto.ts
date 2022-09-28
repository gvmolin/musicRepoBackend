import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateMusicDto {
  @JoiSchema(Joi.string().required())
  name: string;
}

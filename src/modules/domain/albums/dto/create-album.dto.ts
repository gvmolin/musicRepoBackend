import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateAlbumDto {
  @JoiSchema(Joi.string().required())
  name: string;

  @JoiSchema(Joi.string().required())
  createdBy: string;

  @JoiSchema(Joi.string().required())
  artist: string;

  @JoiSchema(Joi.string())
  album: string;

  @JoiSchema(Joi.string())
  cover: string;
}

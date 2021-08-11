import { prop } from '@typegoose/typegoose';

export class PostSchema {
  @prop()
  title: string;
  @prop()
  content: string;
}

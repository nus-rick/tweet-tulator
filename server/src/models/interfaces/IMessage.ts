import { Types } from 'mongoose';

export default interface IMessage {
  author: string;
  parentId: Types.ObjectId;
  bodyText: string;
}

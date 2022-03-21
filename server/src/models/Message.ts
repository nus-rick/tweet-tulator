import mongoose from 'mongoose';
import IMessage from './interfaces/IMessage';
import { REX_OPERATOR_AND_NUMBER, REX_NUMBER_ONLY } from '../constants/regex';

const messageSchema = new mongoose.Schema<IMessage>(
  {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true
    },
    author: {
      type: String,
      required: true,
    },
    bodyText: {
      type: String,
      required: true,
      validate: {
        validator (input: string): boolean {
          // @ts-ignore
          if (this?.parentId) {
            return REX_OPERATOR_AND_NUMBER.test(input);
          }
          return REX_NUMBER_ONLY.test(input)
        },
        message: () => {
          // @ts-ignore
          if (this.parentId) {
            return 'Must be an operator and an integer';
          }
          return 'Must be integer only';
        }
      }
    }
  },
  { timestamps: true }
);

const MessageModel = mongoose.model('messages', messageSchema);

export default MessageModel;
import MessageModel from '../models/Message';
import IMessage from '../models/interfaces/IMessage';
import IMessageStore from './interfaces/IMessageStore';

class MessageStore implements IMessageStore {
  async create(message: IMessage): Promise<IMessage> {
    const newRecord = new MessageModel(message);
    return await newRecord.save();
  };

  async getAll(): Promise<IMessage[]> {
    return await MessageModel.aggregate([
      {
        $match: {
          parentId: undefined,
        }
      },
      {
        $graphLookup: {
          startWith: "$_id",
          from: 'messages',
          as: 'replies',
          connectFromField: '_id',
          connectToField: 'parentId',
        }
      }
    ])
  };
}

export default MessageStore;
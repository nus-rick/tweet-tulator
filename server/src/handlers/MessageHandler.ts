import IMessage from '../models/interfaces/IMessage';
import IMessageStore from '../stores/interfaces/IMessageStore';
import MessageStore from '../stores/MessageStore';
import IMessageHandler from './interfaces/IMessageHandler';

class MessageHandler implements IMessageHandler {
  private messageStore: IMessageStore;

  constructor() {
    this.messageStore = new MessageStore();
  }

  async create(inMessage: IMessage): Promise<IMessage> {
    try {
      const message = await this.messageStore.create(inMessage);
      return message;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<IMessage[]> {
    try {
      const messages = await this.messageStore.getAll();
      return messages;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageHandler;
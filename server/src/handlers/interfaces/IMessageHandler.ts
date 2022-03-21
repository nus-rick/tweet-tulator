import IMessage from '../../models/interfaces/IMessage';

export default interface IMessageHandler {
  getAll(): Promise<IMessage[]>;
}

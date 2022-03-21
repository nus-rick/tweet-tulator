import IMessage from '../../models/interfaces/IMessage';

export default interface IUserStore {
  create(message: IMessage): Promise<IMessage>;
  getAll(): Promise<IMessage[]>;
}

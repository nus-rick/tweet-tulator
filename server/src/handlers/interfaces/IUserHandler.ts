import IUser from '../../models/interfaces/IUser';

export default interface IMessageHandler {
  signIn(username: string, password: string): Promise<IUser>;
}

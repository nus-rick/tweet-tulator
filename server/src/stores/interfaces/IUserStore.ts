import IUser from '../../models/interfaces/IUser';

export default interface IUserStore {
  getByUsername(username: string): Promise<IUser>;
  create(username: string, password: string): Promise<IUser>;
}

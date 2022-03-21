import IUser from '../models/interfaces/IUser';
import IUserStore from './interfaces/IUserStore';
import UserModel from '../models/User';

class UserStore implements IUserStore {
  async getByUsername(username: string): Promise<IUser> {
    return await UserModel.findOne({ username });
  }

  async create(username: string, password: string): Promise<IUser> {
    return await UserModel.create({ username, password });
  }
}

export default UserStore;
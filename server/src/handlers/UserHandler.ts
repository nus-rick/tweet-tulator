import IUser from '../models//interfaces/IUser';
import IUserStore from '../stores/interfaces/IUserStore';
import UserStore from '../stores/UserStore';
import IUserHandler from './interfaces/IUserHandler';

class UserHandler implements IUserHandler {
  private userStore: IUserStore;

  constructor() {
    this.userStore = new UserStore();
  }

  async signIn(username: string, password: string): Promise<IUser> {
    try {
      let user = await this.userStore.getByUsername(username);

      if (!user) {
        user = await this.userStore.create(username, password);
        return user;
      }

      if (user && user.password === password) {
        return user;
      }

      throw Error('Failed Authentication');
    } catch (error) {
      throw error;
    }
  }
}

export default UserHandler;
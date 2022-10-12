import { UserDAO } from '../user/UserDAO';

export class AuthService {
  private userDao: UserDAO = new UserDAO();

  public async getBaseUserByLogin(login: string) {
    return this.userDao.getBaseUserByLogin(login);
  }
}

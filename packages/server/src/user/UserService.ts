import { CreateUserDTO } from '@yasn/api';

import { UserDAO } from './UserDAO';

export class UserService {
  private userDao: UserDAO = new UserDAO();

  public async createUser(createUserDTO: CreateUserDTO) {
    const { login } = createUserDTO;

    const existedUser = await this.userDao.getUserByLogin(login);
    if (existedUser) {
      throw new Error('User already exists');
    }

    await this.userDao.createUser(createUserDTO);
  }
}

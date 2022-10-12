import { SchemaMember } from 'mongodb';

import { BaseUser, CreateUserDTO, User } from '@yasn/api';

import { UserCollectionBase } from '../db/UserCollectionBase';

export class UserDAO extends UserCollectionBase {
  public async createUser(createUserDTO: CreateUserDTO) {
    await this.init();

    const { name, login } = createUserDTO;

    await this.userCollection.insertOne({ name, login, posts: [] });
  }

  private async getUserByLoginWithProjection<T extends BaseUser>(
    login: string,
    projection?: SchemaMember<User, number>
  ): Promise<T | undefined> {
    await this.init();

    const foundedUsers = await this.userCollection
      .find(
        {
          login: {
            $eq: login,
          },
        },
        {
          projection,
        }
      )
      .limit(1)
      .toArray();

    if (foundedUsers.length === 0) {
      return undefined;
    }

    return foundedUsers[0] as unknown as T;
  }

  public async getUserByLogin(login: string) {
    return await this.getUserByLoginWithProjection<User>(login);
  }

  public async getBaseUserByLogin(login: string) {
    return this.getUserByLoginWithProjection(login, { login: 1, name: 1 });
  }
}

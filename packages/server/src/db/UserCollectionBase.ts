import { Collection } from 'mongodb';

import { User } from '@yasn/api';

import { Mongo } from './Mongo';

const USER_COLLECTION_NAME = 'user';

export class UserCollectionBase {
  protected userCollection!: Collection<User>;

  protected async init() {
    const db = await Mongo.getInstance();

    this.userCollection = db.collection<User>(USER_COLLECTION_NAME);
  }
}

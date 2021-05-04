import {CreateUserDTO, User} from '@yasn/api';
import {Mongo} from "../db/Mongo";
import {Collection} from 'mongodb';

const USER_COLLECTION_NAME = 'user';

export class UserDAO {
	private userCollection!: Collection<User>;

	private async init() {
		const db = await Mongo.getInstance();

		this.userCollection = db.collection<User>(USER_COLLECTION_NAME);
	}

	public async createUser(createUserDTO: CreateUserDTO) {
		await this.init();

		const {name, login} = createUserDTO;

		await this.userCollection.insertOne({name, login, posts: []})
	}

	public async getUserByLogin(login: string): Promise<User | null> {
		await this.init();

		const foundedUsers = await this.userCollection.find({
			login: {
				$eq: login
			}
		}).limit(1).toArray();
		console.log(foundedUsers)
		if(foundedUsers.length === 0) {
			return null
		}

		return foundedUsers[0];
	}
}

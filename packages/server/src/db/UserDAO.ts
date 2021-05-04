import {CreateUserDTO, User} from '@yasn/api';
import {Mongo} from "./Mongo";

const USER_COLLECTION_NAME = 'user';

export const createUser = async (createUserDTO: CreateUserDTO) => {
	const mongo = await Mongo.getInstance();
	const db = mongo.getDb();

	const {name, login} = createUserDTO;
	const userCollection = db.collection<User>(USER_COLLECTION_NAME);

	const existedUser = await userCollection.find({
		login: {
			$eq: login
		}
	}).limit(1).toArray();

	if(existedUser.length > 0 ) {
		throw new Error("User already exists");
	}
	await userCollection.insertOne({name, login, posts: []})
}

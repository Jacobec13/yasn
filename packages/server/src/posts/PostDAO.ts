import {UserCollectionBase} from "../db/UserCollectionBase";
import {Post} from '@yasn/api';
import {v4 as uuid} from 'uuid';

export interface CreateUserPostParams {
	login: string;
	message: string;
}

export class PostDAO extends UserCollectionBase {
	public async getUserPosts(login: string) {
		await this.init();

		const postsCollections = await this.userCollection.find({
			login: {
				$eq: login
			}
		}, {
			projection: {
				posts: 1
			}
		}).limit(2).toArray();

		if(postsCollections.length === 0 || postsCollections.length > 1) {
			throw new Error('Not found or found too much');
		}

		return postsCollections[0].posts;
	}

	public async createUserPost({login, message}: CreateUserPostParams) {
		await this.init();

		const newPost: Post = {
			message,
			id: uuid()
		};

		await this.userCollection.updateOne({
			login: {
				$eq: login
			}
		}, {
			$push: {
				'posts': newPost
			}
		})
	}
}

import {UserCollectionBase} from "../db/UserCollectionBase";
import {Post} from '@yasn/api';
import {v4 as uuid} from 'uuid';

export interface CreateUserPostParams {
	login: string;
	message: string;
}

export interface LikeParams {
	login: string;
	messageId: string;
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

		if (postsCollections.length === 0 || postsCollections.length > 1) {
			throw new Error('Not found or found too much');
		}

		return postsCollections[0].posts;
	}

	public async createUserPost({login, message}: CreateUserPostParams) {
		await this.init();

		const newPost: Post = {
			message,
			id: uuid(),
			likes: []
		};

		await this.userCollection.updateOne({
			login: {
				$eq: login
			}
		}, {
			$push: {
				'posts': newPost
			}
		});
	}

	public async addLoginToLike({login, messageId}: LikeParams) {
		await this.init();

		await this.userCollection.updateOne({
			posts: {
				$elemMatch: {
					id: {
						$eq: messageId
					}
				}
			}
		}, {
			$push: {
				'posts.$.likes': login
			}
		});
	}

	public async removeLoginFromLike({login, messageId}: LikeParams) {
		await this.init();

		await this.userCollection.updateOne({
			posts: {
				$elemMatch: {
					id: {
						$eq: messageId
					}
				}
			}
		}, {
			$pull: {
				'posts.$.likes': login
			}
		});
	}

	public async getLikes(messageId: string) {
		await this.init();

		const users = await this.userCollection.find({
			posts: {
				$elemMatch: {
					id: {
						$eq: messageId
					}
				}
			}
		}, {
			projection: {
				'posts.$': 1
			},

		}).limit(2).toArray();
		console.log(users)
		if (users.length !== 1 || users[0].posts.length !== 1) {
			throw new Error('Post not founded');
		}

		return users[0].posts[0].likes;
	}
}

import {PostDAO, CreateUserPostParams} from "./PostDAO";

export class PostsService {
	private postDao = new PostDAO();

	public async getUserPosts(login: string) {
		return await this.postDao.getUserPosts(login);
	}

	public async createUserPost(params: CreateUserPostParams) {
		await this.postDao.createUserPost(params);
	}
}

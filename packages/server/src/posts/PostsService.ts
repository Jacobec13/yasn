import { PostDAO, CreateUserPostParams, LikeParams } from './PostDAO';

export class PostsService {
  private postDao = new PostDAO();

  public async getUserPosts(login: string) {
    return await this.postDao.getUserPosts(login);
  }

  public async createUserPost(params: CreateUserPostParams) {
    await this.postDao.createUserPost(params);
  }

  public async likeMessage(params: LikeParams) {
    const { messageId, login } = params;
    const likes = await this.postDao.getLikes(messageId);

    if (likes.indexOf(login) > -1) {
      await this.postDao.removeLoginFromLike(params);
    } else {
      await this.postDao.addLoginToLike(params);
    }
  }
}

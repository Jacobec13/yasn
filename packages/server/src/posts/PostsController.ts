import { Express } from 'express';

import { CreatePostDTO, LikePostDTO } from '@yasn/api';

import { API_PREFIX } from '../constants';
import { getUserFromReq, RequestExtended } from '../auth/AuthMidleware';

import { PostsService } from './PostsService';

export const postsController = (app: Express) => {
  const postsService = new PostsService();

  app.get(`${API_PREFIX}/getUserPosts`, async (req: RequestExtended, res) => {
    const { login: userLogin } = getUserFromReq(req);
    console.log(req.query['userForView']);
    const login = req.query['userForView']
      ? (req.query['userForView'] as string)
      : userLogin;

    try {
      const posts = await postsService.getUserPosts(login);
      res.json(posts);
    } catch (e) {
      res.status(500);

      res.send();
    }
  });

  app.post(
    `${API_PREFIX}/createPost`,
    async (req: RequestExtended<CreatePostDTO>, res) => {
      const { message } = req.body;
      const { login } = getUserFromReq(req);

      try {
        await postsService.createUserPost({
          login,
          message,
        });
        res.status(201);
      } catch (e) {
        res.status(500);
      }
      res.send();
    }
  );

  app.post(
    `${API_PREFIX}/likePost`,
    async (req: RequestExtended<LikePostDTO>, res) => {
      const { login } = getUserFromReq(req);
      const { messageId } = req.body;

      try {
        await postsService.likeMessage({
          login,
          messageId,
        });
        res.status(201);
      } catch (e) {
        res.status(500);
        console.error(e);
      }

      res.send();
    }
  );
};

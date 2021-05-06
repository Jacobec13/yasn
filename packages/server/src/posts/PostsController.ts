import {Express} from "express";
import {API_PREFIX} from "../constants";
import {RequestExtended} from "../auth/AuthMidleware";
import {PostsService} from "./PostsService";
import {CreatePostDTO, LikePostDTO} from "@yasn/api";

export const postsController = (app: Express) => {
	const postsService = new PostsService();

	app.get(`${API_PREFIX}/getUserPosts`, async (req: RequestExtended, res) => {
		const {login: userLogin} = req.user!;
		console.log(req.query['userForView'])
		const login = req.query['userForView'] ? req.query['userForView'] as string : userLogin;

		try {
			const posts = await postsService.getUserPosts(login);
			res.json(posts);
		} catch (e) {
			res.status(500);

			res.send();
		}
	});

	app.post(`${API_PREFIX}/createPost`, async (req: RequestExtended<CreatePostDTO>, res) => {
		const {message} = req.body;
		const {login} = req.user!;

		try {
			await postsService.createUserPost({
				login, message
			});
			res.status(201);
		} catch (e) {
			res.status(500);
		}
		res.send();
	});

	app.post(`${API_PREFIX}/likePost`, async (req: RequestExtended<LikePostDTO>, res) => {
		const {login} = req.user!;
		const {messageId} = req.body;

		try {
			await postsService.likeMessage({
				login, messageId
			})
			res.status(201);
		} catch (e) {
			res.status(500);
			console.error(e)
		}

		res.send();
	})
};

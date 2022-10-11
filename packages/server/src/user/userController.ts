import {Express} from 'express';
import {CreateUserDTO} from "@yasn/api";
import {API_PREFIX} from "../constants";
import {UserService} from "./UserService";
import {RequestExtended} from "../auth/AuthMidleware";

export const addUserController = (app: Express) => {
	const userService = new UserService();

	app.post(`${API_PREFIX}/createUser`, async (req: RequestExtended<CreateUserDTO>, res) => {
		let result: string = '';
		console.log(req.user)
		try {
			await userService.createUser(req.body);
			res.status(201);
		}
		catch (e) {
			res.status(500);
			result = (e as Error).message;
		}
		res.send(result);
	});

	app.get(`${API_PREFIX}/auth`, async (req: RequestExtended, res) => {
		if(req.user) {
			res.status(200);
		} else {
			res.status(401);
		}

		res.send();
	})
}

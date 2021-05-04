import {Express} from 'express';
import {CreateUserDTO} from "@yasn/api";
import {API_PREFIX} from "../constants";
import {UserService} from "../user/UserService";
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
			result = e.message;
		}
		res.send(result);
	});
}

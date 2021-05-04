import {Express} from 'express';
import {CreateUserDTO} from "@yasn/api";
import {API_PREFIX} from "../constants";
import {UserService} from "../user/UserService";

export const addUserController = (app: Express) => {
	const userService = new UserService();

	app.post<{}, {}, CreateUserDTO>(`${API_PREFIX}/createUser`, async (req, res) => {
		let result: string = '';
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

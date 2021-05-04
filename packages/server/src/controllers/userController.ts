import {Express} from 'express';
import {CreateUserDTO} from "@yasn/api";
import {createUser} from "../db/UserDAO";
import {API_PREFIX} from "../constants";

export const addUserController = (app: Express) => {
	app.post<{}, {}, CreateUserDTO>(`${API_PREFIX}/createUser`, async (req, res) => {
		try {
			await createUser(req.body);
			res.status(201);
		}
		catch (e) {
			res.status(500);
		}
		res.send();
	});
}

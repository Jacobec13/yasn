import {NextFunction, Request, Response} from 'express';
import {BaseUser} from "@yasn/api";
import {AuthService} from "./AuthService";
import atob from 'atob';

export interface RequestExtended<B = {}> extends Request<{}, {}, B> {
	user?: BaseUser;
}

const getLogin = (token: string): string => {
	const clean = token.split('Basic ', )[1];

	if(!clean) {
		return '';
	}

	return atob(clean).split(':')[0];
}

const processAuthError = (req: RequestExtended, res: Response) => {
	if(!req.path.includes('createUser')) {
		res.status(401);
		res.send();
	}
}

export const authMiddleware = async (req: RequestExtended, res: Response, next: NextFunction) => {
	const authService = new AuthService();

	const authToken = req.get('Authorization');

	if(!authToken) {
		if(!req.path.includes('createUser')) {
			res.status(401);
			res.send();
		} else {
			next();
		}
		return;
	}

	const login = getLogin(authToken);

	if(!login) {
		if(!req.path.includes('createUser')) {
			res.status(401);
			res.send();
		} else {
			next();
		}
		return;
	}

	req.user = await authService.getBaseUserByLogin(login);

	if(!req.path.includes('createUser') && !req.user) {
		res.status(401);
		res.send();
	} else {
		next();
	}
}

import express from 'express';
import bodyParser from "body-parser";

import './db/Mongo';
import {CreateUserDTO} from "@yasn/api";
import {createUser} from "./db/UserDAO";

const app = express();
const port = 3000;

const API_PREFIX = '/api'

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('hello world')
})

app.post<{}, {}, CreateUserDTO>(`${API_PREFIX}/createUser`, async (req, res) => {
	console.log(req.body)
	try {
		await createUser(req.body);
		res.status(201);
	}
	catch (e) {
		res.status(500);
	}
	res.send();
})

app.listen(port, () => console.log(`Server up on port: ${port}`));
